const mongoose = require('mongoose');
const dbConnect = require('../../lib/utils/dbConnect');

beforeAll(() => {
  return dbConnect('mongodb://localhost:27017/test');
});

beforeEach(() => {
  return mongoose.connection.dropDatabase();
});

afterAll(() => {
  return mongoose.connection.close();
});
