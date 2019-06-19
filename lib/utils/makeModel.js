const mongoose = require('mongoose');
const parseSchema = require('./parseSchema');

const makeModel = (name, mdlSchema) => mongoose.model(name, new mongoose.Schema(parseSchema(mdlSchema)));

module.exports = makeModel;
