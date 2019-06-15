require('dotenv').config();
const request = require('supertest');
const app = require('../../lib/app');
require('../utils/data-helpers');

describe('Database routes', () => {
  it('creates a new database in mongodb', () => {
    return request(app)
      .post('/api/v1/databases')
      .send({
        dbName: 'something',
        publicBool: true,
        // deployed: false,
        ownerUsername: 'chi-chi',
        ownerId: '1234'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          dbName: 'something',
          publicBool: true,
          deployed: false,
          ownerUsername: 'chi-chi',
          ownerId: '1234',
          __v: 0
        });
      });
  });
});
