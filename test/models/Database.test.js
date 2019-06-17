const mongoose = require('mongoose');
const Database = require('../../lib/models/Database');

describe('database model', () => {
  it('it has a dbName, publicAccess, deployed, username, and userId', () => {
    const db = new Database({
      dbName: 'test name',
      publicAccess: true,
      username: 'test username',
      userId: 'testId'
    });

    expect(db.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      dbName: 'test name',
      publicAccess: true,
      deployed: false,
      username: 'test username',
      userId: 'testId'
    });
  });
});
