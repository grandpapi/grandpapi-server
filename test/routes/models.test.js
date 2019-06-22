require('dotenv').config();
const mongoose = require('mongoose');
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

const BASE_PATH = '/api/v1/meganap/models';

describe('Model routes', () => {
  const dbId = new mongoose.Types.ObjectId();
  
  it('creates a new model in mongodb', () => {
    return request(app)
      .post(BASE_PATH)
      .send({
        loading: false,
        mdlName: 'Something',
        mdlSchema: {
          name: String,
          age: Number
        },
        mdlId: '',
        dbId: dbId.toString()
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          mdlName: 'Something',
          mdlSchema: JSON.stringify({
            name: String,
            age: Number
          }),
          dbId: expect.any(String),
          __v: 0
        });
      });
  });
  
  it('gets all models in a database', async () => {
    const createDbRes = await request(app)
      .post('/api/v1/meganap/databases')
      .send({
        dbName: 'something',
        publicAccess: true
      });

    const createRes = await request(app)
      .post(`${BASE_PATH}`)
      .send({
        loading: false,
        mdlName: 'Something',
        mdlSchema: {},
        dbId: createDbRes.body._id
      });

    const res = await request(app)
      .get(`${BASE_PATH}/?database=${createDbRes.body._id.toString()}`);

    expect(res.body).toEqual([{
      _id: createRes.body._id.toString(),
      mdlName: 'Something',
      mdlSchema: '{}',
      dbId: createDbRes.body._id,
      __v: 0
    }]);
  });
  
  it('gets all models of a user and populates db', async () => {
    const createDbRes = await request(app)
      .post('/api/v1/meganap/databases')
      .send({
        dbName: 'something',
        publicAccess: true
      });

    const createRes = await request(app)
      .post(`${BASE_PATH}`)
      .send({
        loading: false,
        mdlName: 'Something',
        mdlSchema: {},
        dbId: createDbRes.body._id
      });

    const res = await request(app)
      .get(`${BASE_PATH}/?username=chi-chi`);

    expect(res.body).toEqual([{
      _id: createRes.body._id.toString(),
      mdlName: 'Something',
      mdlSchema: '{}',
      dbId: {
        _id: createDbRes.body._id.toString(),
        dbName: 'something',
        publicAccess: true,
        deployed: false,
        username: 'chi-chi',
        userId: '1234',
        __v: 0
      },
      __v: 0
    }]);
  });
  
  it('gets a model and populates the database', async () => {
    const createDbRes = await request(app)
      .post('/api/v1/meganap/databases')
      .send({
        dbName: 'something',
        publicAccess: true
      });

    const createRes = await request(app)
      .post('/api/v1/meganap/models')
      .send({
        loading: false,
        mdlName: 'Something',
        mdlSchema: {},
        dbId: createDbRes.body._id
      });

    const res = await request(app)
      .get(`/api/v1/meganap/models/${createRes.body._id}`);

    expect(res.body).toEqual({
      _id: createRes.body._id.toString(),
      mdlName: 'Something',
      mdlSchema: '{}',
      dbId: {
        _id: createDbRes.body._id.toString(),
        dbName: 'something',
        publicAccess: true,
        deployed: false,
        username: 'chi-chi',
        userId: '1234',
        __v: 0
      },
      __v: 0
    });
  });
});
