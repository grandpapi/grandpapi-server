require('dotenv').config();
const request = require('supertest');
const app = require('../../lib/app');
require('../utils/data-helpers');

jest.mock('../../lib/middleware/ensure-auth.js', () => (req, res, next) => {
  const user = {
    nickname: 'chi-chi',
    sub: '1234'
  };
  req.user = user;
  next();
});

describe('Database routes', () => {
  it('creates a new database in mongodb', () => {
    return request(app)
      .post('/api/v1/meganap/databases')
      .send({
        dbName: 'something',
        publicAccess: true
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          dbName: 'something',
          publicAccess: true,
          deployed: false,
          username: 'chi-chi',
          userId: '1234',
          __v: 0
        });
      });
  });
  
  it('gets database by db id', async () => {
    await request(app)
      .post('/api/v1/meganap/databases')
      .send({
        dbName: 'something',
        publicAccess: true
      });

    const res = await request(app)
      .get('/api/v1/meganap/databases/1234');

    expect(res.body).toEqual([{
      _id: expect.any(String),
      dbName: 'something',
      publicAccess: true,
      deployed: false,
      username: 'chi-chi',
      userId: '1234',
      __v: 0
    }]);
  });
  
  it('gets all public databases', async () => {
    await request(app)
      .post('/api/v1/meganap/databases')
      .send({
        dbName: 'something',
        publicAccess: true
      });

    const res = await request(app)
      .get('/api/v1/meganap/databases');

    expect(res.body).toEqual([{
      _id: expect.any(String),
      dbName: 'something',
      publicAccess: true,
      deployed: false,
      username: 'chi-chi',
      userId: '1234',
      __v: 0
    }]);
  });
});
