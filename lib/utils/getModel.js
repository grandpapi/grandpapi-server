const mongoose = require('mongoose');
const Database = require('../models/Database');
const Model = require('../models/Model');
const makeModel = require('./makeModel');

module.exports = async ({ username, dbName, mdlName, }) => {
  try {
    return mongoose.model(username + dbName + mdlName);
  } catch(e) {
    const db = await Database.findOne({ username, dbName });
    const { mdlSchema } = await Model.findOne({ mdlName, dbId: db._id });
    return makeModel(username + dbName + mdlName, mdlSchema);
  }
};
