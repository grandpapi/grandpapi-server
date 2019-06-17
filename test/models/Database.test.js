const mongoose = require('mongoose');
const Database = require('../../lib/models/Database');

describe('database model', () => {
  it('it has a dbName, publicBool, deployed, ownerUsername, and ownerId', () => {
    const db = new Database({
      dbName: 'test name',
      publicBool: true,
      ownerUsername: 'test username',
      ownerId: 'testId'
    });

    expect(db.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      dbName: 'test name',
      publicBool: true,
      deployed: false,
      ownerUsername: 'test username',
      ownerId: 'testId'
    });
  });
});
