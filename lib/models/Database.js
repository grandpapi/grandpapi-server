const mongoose = require('mongoose');

const databaseSchema = new mongoose.Schema({
  dbName: {
    type: String,
    required: true
  },
  publicAccess: {
    type: Boolean,
    required: true
  },
  deployed: {
    type: Boolean,
    default: false,
  },
  username: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
});

const Database = mongoose.model('Database', databaseSchema);

module.exports = Database;
