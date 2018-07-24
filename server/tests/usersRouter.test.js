const request = require('supertest');

const { app } = require('./../index');
const { users, populateUsers } = require('./seed/seedTestUsers');
const { User } = require('./../models/User');

beforeAll(populateUsers);

// USER REGISTER
describe('POST /api/users/register', () => {
  test('should create a user and return just params wanted', async (done) => {
    const inputParams = {
      email: 'example@example.com',
      password: 'password123',
      name: 'James',
      company: 'Test Company',
      phone: '0425888777'
    };

    const res = await request(app)
      .post('/api/users/register')
      .send(inputParams);

    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe(inputParams.email);
    expect(res.body.user._id).toBeFalsy();
    expect(res.body.user.password).toBeFalsy();
    expect(res.body.user.authTokens).toBeFalsy();
    expect(res.body.user.access_token).toBeFalsy();
    expect(res.body.user.name).toBeTruthy();
    expect(res.body.user.company).toBeTruthy();
    expect(res.body.user.phone).toBeTruthy();
    expect(res.body.user.linkedInConnected).toBe(false);
    expect(res.body.user.linkedInToggleStatus).toBe(false);
    expect(res.headers.authorization).toBeTruthy();
    const token = res.headers.authorization.split(' ')[1];

    const user = await User.findOne({ email: inputParams.email });
    expect(user).toBeTruthy();
    expect(user.password).not.toBe(inputParams.password);
    expect(user.authTokens).toContain(token);
    done();
  });

  test('should NOT create a user if email already used', async (done) => {
    const res = await request(app)
      .post('/api/users/register')
      .send(users[0]);

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

  test('should have validation errors if invalid email', async (done) => {
    const email = 'badbadbad';
    const password = 'password123';
    const name = 'Test Name';
    const company = 'Test Company';
    const phone = '0425111222';

    const res = await request(app)
      .post('/api/users/register')
      .send({ email, password, name, company, phone });

    expect(res.status).toBe(400);
    done();
  });

  test('should have validation errors invalid email', async (done) => {
    const email = 'bad@email.com';
    const password = 'password123';
    const name = 'Test Name';
    const company = 'Test Company';
    const phone = '12345432123213';

    const res = await request(app)
      .post('/api/users/register')
      .send({ email, password, name, company, phone });

    expect(res.status).toBe(400);
    done();
  });
});

// USER LOGIN
describe('POST /api/users/login', () => {
  test('should login user', async (done) => {
    const { _id, email, password } = users[0];

    const res = await request(app)
      .post('/api/users/login')
      .send({ email, password });

    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe(email);
    expect(res.headers.authorization).toBeTruthy();
    const token = res.headers.authorization.split(' ')[1];
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

// USER PROFILE
describe('GET /api/users/me', () => {
  test('should return user if authenticated', async (done) => {
    const { email, authTokens } = users[0];

    const res = await request(app)
      .get('/api/users/me')
      .set('authorization', `Bearer ${authTokens[0]}`);

    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe(email);
    done();
  });

  test('should return 401 if not authenticated', async (done) => {
    const res = await request(app)
      .get('/api/users/me')
      .set('authorization', `Bearer randomString123BADBADio21`);

    expect(res.status).toBe(401);
    expect(res.body.user).toBeFalsy();
    done();
  });
});

// USER UPDATE
describe('PATCH /api/users/update', () => {
  test('should update user', async (done) => {
    const { _id, authTokens } = users[1];

    const name = 'Billy';
    const company = 'Test Company';
    const phone = '0425888999';

    const res = await request(app)
      .patch('/api/users/update')
      .set('authorization', `Bearer ${authTokens[0]}`)
      .send({ name, company, phone });

    expect(res.status).toBe(200);
    expect(res.body.user).toBeTruthy();
    expect(res.body.user.name).toBe(name);
    expect(res.body.user.company).toBe(company);
    expect(res.body.user.phone).toBe(phone);

    const user = await User.findById(_id);
    expect(user.name).toBe(name);
    expect(user.company).toBe(company);
    expect(user.phone).toBe(phone);
    done();
  });
});

// USER LOGOUT
describe('DELETE /api/users/logout', () => {
  test('should delete a users authToken', async (done) => {
    const { _id, authTokens } = users[0];

    const res = await request(app)
      .delete('/api/users/logout')
      .set('authorization', `Bearer ${authTokens[0]}`);

    expect(res.status).toBe(200);
    const user = await User.findById(_id);
    expect(user.authTokens).not.toContain(authTokens[0]);
    done();
  });
});
