const request = require('supertest');

const { app } = require('./../index');
const { users, populateUsers } = require('./seed/seed');
const { User } = require('./../models/User');

beforeEach(populateUsers);

describe('POST /api/users/register', () => {
  test('should create a user', async (done) => {
    const email = 'example@example.com';
    const password = 'password123';

    const res = await request(app)
      .post('/api/users/register')
      .send({ email, password });

    expect(res.status).toBe(200);
    expect(res.body.user._id).toBeTruthy();
    expect(res.body.user.email).toBe(email);
    expect(res.headers['set-cookie']).toBeTruthy();

    const token = res.headers['set-cookie'][0].split('=')[1].split(';')[0];
    const user = await User.findOne({ email });
    expect(user).toBeTruthy();
    expect(user.password).not.toBe(password);
    expect(user.authTokens).toContain(token);
    done();
  });

  test('should NOT create a user if email already used', async (done) => {
    const { email, password } = users[0];

    const res = await request(app)
      .post('/api/users/register')
      .send({ email, password });

    expect(res.status).toBe(400);
    done();
  });

  test('should have validation errors if bad request', async (done) => {
    const email = 'bad';
    const password = '123';

    const res = await request(app)
      .post('/api/users/register')
      .send({ email, password });

    expect(res.status).toBe(400);
    done();
  });
});

describe('POST /api/users/login', () => {
  test('should login user', async (done) => {
    const { _id, email, password } = users[0];

    const res = await request(app)
      .post('/api/users/login')
      .send({ email, password });

    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe(email);
    expect(res.headers['set-cookie']).toBeTruthy();

    const token = res.headers['set-cookie'][0].split('=')[1].split(';')[0];
    const user = await User.findById(_id);
    expect(user.authTokens).toContain(token);
    done();
  });

  test('should reject invalid login', async (done) => {
    const { _id, email } = users[1];
    const password = 'badpassword';

    const res = await request(app)
      .post('/api/users/login')
      .send({ email, password });

    expect(res.status).toBe(400);
    const user = await User.findById(_id);
    expect(user.authTokens.length).toBe(1);
    done();
  });
});

describe('GET /api/users/me', () => {
  test('should return user if authenticated', async (done) => {
    const { _id, email, authTokens } = users[0];

    const res = await request(app)
      .get('/api/users/me')
      .set('Cookie', `authToken=${authTokens[0]}`);

    expect(res.status).toBe(200);
    expect(res.body.user._id).toBe(_id.toHexString());
    expect(res.body.user.email).toBe(email);
    done();
  });

  test('should return 401 if not authenticated', async (done) => {
    const res = await request(app)
      .get('/api/users/me')
      .set('Cookie', `authToken=wrong12BADBADio213`);

    expect(res.status).toBe(401);
    expect(res.body.user).toBeFalsy();
    done();
  });
});

describe('DELETE /api/users/logout', () => {
  test('should delete a users authToken', async (done) => {
    const { _id, authTokens } = users[0];

    const res = await request(app)
      .delete('/api/users/logout')
      .set('Cookie', `authToken=${authTokens[0]}`);

    expect(res.status).toBe(200);
    const user = await User.findById(_id);
    expect(user.authTokens).not.toContain(authTokens[0]);
    done();
  });
});
