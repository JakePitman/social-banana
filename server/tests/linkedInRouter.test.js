const request = require('supertest');

const { app } = require('./../index');
const { users, populateUsers } = require('./seed/seedTestUsers');
const { margaret } = require('./../db/seed/seedConnectedUsers');
const { User } = require('./../models/User');

beforeAll(populateUsers);

describe('GET /api/linkedIn/authURL', () => {
  test('should return url', async (done) => {
    const { _id, email, authTokens } = users[0];

    const res = await request(app)
      .get('/api/linkedIn/authURL')
      .set('authorization', `Bearer ${authTokens[0]}`);

    expect(res.status).toBe(200);
    expect(res.body.url).toContain(_id);
    done();
  });
});

/// callback?userId=5b4eefd1432726b2449e1bdf&code=asidjo&state=tEAmBaNaNa
// - approved: <CALLBACK_URL>?code=<CODE>&state=<STATE>
// - rejected: <CALLBACK_URL>?error=<ERROR>&error_description=<ERROR_DESCRIPTION>&state=<STATE>
describe('GET /api/llinkedIn/callback', () => {
  test('should respond with error from callback', async (done) => {
    const res = await request(app).get(
      '/api/linkedIn/callback?error=awwNo&error_description=icanteven'
    );

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('icanteven');
    done();
  });

  test('should not find user which doesnot exist', async (done) => {
    const _id = '5b4eefd1432726b2449e1bdf';
    const res = await request(app).get(`/api/linkedIn/callback?userId=${_id}`);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('No user found');
    done();
  });

  test('should be unauthorized if state is changed', async (done) => {
    const { _id, email, authTokens } = users[0];
    const res = await request(app).get(`/api/linkedIn/callback?userId=${_id}`);

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('HACKZORS!!! >:(');
    done();
  });

  // FIXME: CORS problem! Likely because using 3001 atm because 3000 is screwing up in browser
  // test('should fail if auth code is incorrect', async (done) => {
  //   const { _id, email, authTokens } = users[0];

  //   const code = 'io1nfoi13nfio13nf13nf';

  //   const res = await request(app).get(
  //     `/api/linkedIn/callback?userId=${_id}&code=${code}&state=${
  //       process.env.LINKEDIN_STATE
  //     }`
  //   );

  //   expect(res.status).toBe(400);
  //   expect(res.body.error).toBe('not sure');
  //   done();
  // });
});

// FIXME: CORS PROBLEM! 'Error: Response for preflight has invalid HTTP status code 401'
// describe('POST /api/linkedIn/share', () => {
//   test('should post to linkedIn', async (done) => {
//     const { authTokens } = margaret;
//     const res = await request(app)
//       .post('/api/linkedIn/share')
//       .set('authorization', `Bearer ${authTokens[0]}`);

//     expect(res.status).toBe(201);
//     expect(res.body.updateUrl).toBeTruthy();
//     done();
//   });
// });
