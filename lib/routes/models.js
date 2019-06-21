const { Router } = require('express');
const Model = require('../models/Model');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth, async (req, res, next) => {
    try {
      req.body.mdlSchema = JSON.stringify(req.body.mdlSchema);
      const newModel = await Model.create({ ...req.body });
      res.send(newModel);
    } catch(e) {
      next(e);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      if(req.query.database) {
        const dbMdls = await Model.find({ dbId: req.query.database });
        res.send(dbMdls);
      }
      if(req.query.username) {
        const mdls = await Model.find()
          .populate('dbId')
          .lean();
        const userMdls = mdls.filter(model => model.dbId.username === req.query.username);
        res.send(userMdls);
      }
    } catch(e) {
      next(e);
    }
  })
  
  .get('/:id', ensureAuth, async (req, res, next) => {
    try {
      const mdl = await Model.findById(req.params.id)
        .populate('dbId')
        .lean();
      res.send(mdl);
    } catch(e) {
      next(e);
    }
  });
