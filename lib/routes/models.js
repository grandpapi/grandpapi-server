const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Model = require('../models/Model');

module.exports = Router()
  .post('/', ensureAuth(), async (req, res, next) => {
    try {
      req.body.mdlSchema = JSON.stringify(req.body.mdlSchema);
      const newModel = await Model.create({ ...req.body });
      res.send(newModel);
    } catch(e) {
      next(e);
    }
  })
  .patch('/', ensureAuth(), async (req, res, next) => {
    try {
      const modelToUpdate = await Model.findById(req.body.mdlId);
      const modelToUpdateSchema = JSON.parse(modelToUpdate.mdlSchema);
      const mdlSchema = JSON.stringify({ ...modelToUpdateSchema, [req.body.fieldName]: req.body.dataType });
      const updatedModel = await Model.findByIdAndUpdate(req.body.mdlId, { mdlSchema }, { new: true });
      console.log(updatedModel);
      res.send(updatedModel);
    } catch(e) {
      next(e);
    }
  });
