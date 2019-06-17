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
  });
