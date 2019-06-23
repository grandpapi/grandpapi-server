require('dotenv').config();
const request = require('supertest');
const app = require('../../lib/app');
require('../utils/userRoutes-data-helpers');

jest.mock('../../lib/middleware/ensure-auth.js', () => (req, res, next) => {
  const user = {
    nickname: 'chi-chi',
    sub: '1234'
  };
  req.user = user;
  next();
});

describe('Database routes', () => {

  const BASE_PATH = '/api/chi-chi/dbName/mdlName';

  it('posts data to user route', async () => {
    const res = await request(app)
      .post(`${BASE_PATH}`)
      .send({
        name: 'test name',
        age: 42
      });

    expect(res.body).toEqual({
      _id: expect.any(String),
      name: 'test name',
      age: 42,
      __v: 0
    });
  });

  it('gets all data from user route', async () => {
    const createRes = await request(app)
      .post(`${BASE_PATH}`)
      .send({
        name: 'test name',
        age: '42'
      });

    const res = await request(app)
      .get(`${BASE_PATH}`);

    expect(res.body).toEqual([createRes.body]);
  });
});
