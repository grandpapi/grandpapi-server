const mongoose = require('mongoose');
const Database = require('../models/Database');
const Model = require('../models/Model');
const makeSchema = require('./makeSchema');

module.exports = async ({ username, dbName, mdlName, }) => {
  try {
    return mongoose.model(username + dbName + mdlName);
  } catch(e) {
    const db = await Database.findOne({ username, dbName });
    const { mdlSchema } = await Model.findOne({ mdlName, dbId: db._id });
    return mongoose.model(username + dbName + mdlName, makeSchema(mdlSchema));
  }
};
