require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
require('../utils/data-helpers');

jest.mock('../../lib/middleware/ensure-auth.js', () => () => (req, res, next) => {
  const user = {
    nickname: 'chi-chi',
    sub: '1234'
  };
  req.user = user;
  next();
});

describe('Model routes', () => {
  const dbId = new mongoose.Types.ObjectId();
  
  it('creates a new model in mongodb', () => {
    return request(app)
      .post('/api/v1/meganap/models')
      .send({
        loading: false,
        mdlName: 'Something',
        mdlSchema: {},
        mdlId: '',
        dbId: dbId.toString()
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          mdlName: 'Something',
          mdlSchema: '{}',
          dbId: expect.any(String),
          __v: 0
        });
      });
  });
  
  it('patches a model schema in mongodb', async () => {
    const createRes = await request(app)
      .post('/api/v1/meganap/models')
      .send({
        loading: false,
        mdlName: 'Something',
        mdlSchema: {},
        dbId: dbId.toString()
      });

    const res = await request(app)
      .patch('/api/v1/meganap/models')
      .send({
        fieldName: 'testField',
        dataType: 'String',
        mdlId: createRes.body._id
      });

    expect(res.body).toEqual({
      _id: createRes.body._id.toString(),
      mdlName: 'Something',
      mdlSchema: '{"testField":"String"}',
      dbId: expect.any(String),
      __v: 0
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
      .post('/api/v1/meganap/models')
      .send({
        loading: false,
        mdlName: 'Something',
        mdlSchema: {},
        dbId: createDbRes.body._id
      });

    const res = await request(app)
      .get('/api/v1/meganap/models?database=something');

    expect(res.body).toEqual([{
      _id: createRes.body._id.toString(),
      mdlName: 'Something',
      mdlSchema: '{}',
      dbId: createDbRes.body._id,
      __v: 0
    }]);
  });
  
  it('gets a models and populates the database', async () => {
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
        _id: expect.any(String),
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
