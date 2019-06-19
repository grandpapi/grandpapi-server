const Database = require('../models/Database');
const Model = require('../models/Model');
const makeModel = require('./makeModel');

module.exports = async ({ username, dbName, mdlName, }) => {
  const db = await Database.findOne({ username, dbName });
  const mdl = await Model.findOne({ mdlName, dbId: db._id });
  return makeModel(mdl.mdlName, mdl.mdlSchema);
};
