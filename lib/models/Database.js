const mongoose = require('mongoose');

const databaseSchema = new mongoose.Schema({
  dbName: {
    type: String,
    required: true
  },
  publicBool: {
    type: Boolean,
    required: true
  },
  deployed: {
    type: Boolean,
    default: false,
  },
  ownerUsername: {
    type: String,
    required: true
  },
  ownerId: {
    type: String,
    required: true
  }
});

const Database = mongoose.model('Database', databaseSchema);

module.exports = Database;
