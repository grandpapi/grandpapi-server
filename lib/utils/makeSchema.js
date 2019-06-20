const mongoose = require('mongoose');

function reviver(key, value) {
  switch(value) {
    case 'String':
    case 'Image':
      return {
        type: String,
        required: true
      };
    case 'Number':
      return {
        type: Number,
        required: true
      };
    case 'Boolean':
      return {
        type: Boolean,
        required: true
      };
    default:
      return value;
  }
}

module.exports = mdlSchema => new mongoose.Schema(JSON.parse(mdlSchema, reviver));
