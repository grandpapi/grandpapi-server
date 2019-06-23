const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
const dbConnect = require('../../lib/utils/dbConnect');

beforeAll(() => {
  return dbConnect('mongodb://localhost:27017/test');
});

beforeEach(async () => {
  await mongoose.connection.dropDatabase();
  const dbRes = await request(app)
    .post('/api/v1/meganap/databases')
    .send({
      dbName: 'dbName',
      publicAccess: true
    });

  await request(app)
    .post('/api/v1/meganap/models')
    .send({
      loading: false,
      mdlName: 'mdlName',
      mdlSchema: {
        name: 'String',
        age: 'Number'
      },
      dbId: dbRes.body._id
    });
});

afterAll(() => {
  return mongoose.connection.close();
});
