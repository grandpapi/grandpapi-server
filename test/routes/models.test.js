require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
require('../utils/data-helpers');

describe('Model routes', () => {
  const dbId = new mongoose.Types.ObjectId();
  it('creates a new model in mongodb', () => {
    return request(app)
      .post('/api/v1/meganap/models')
      .send({
        loading: false,
        mdlName: 'Something',
        mdlSchema: {},
        modelId: '',
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
});
