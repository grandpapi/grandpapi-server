const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
  dbId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Database'
  },
  mdlName: {
    type: String,
    required: true
  },
  mdlSchema: {
    type: String,
    required: true
  }
});

const Model = mongoose.model('Model', modelSchema);

module.exports = Model;
