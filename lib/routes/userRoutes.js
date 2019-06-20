const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const getModel = require('../utils/getModel');

module.exports = Router()
  .post('/:username/:dbName/:mdlName', ensureAuth, async (req, res, next) => {
    try {
      const UserModel = await getModel(req.params);
      const createdData = await UserModel.create(req.body);
      res.send(createdData);
    } catch(e) {
      next(e);
    }
  })
  .get('/:username/:dbName/:mdlName', async (req, res, next) => {
    try {
      const UserModel = await getModel(req.params);
      const allData = await UserModel.find().lean();
      res.send(allData);
    } catch(e) {
      next(e);
    }
  })
  .get('/:username/:dbName/:mdlName/:id', async (req, res, next) => {
    try {
      const UserModel = await getModel(req.params);
      const data = await UserModel.findById(req.params.id).lean();
      res.send(data);
    } catch(e) {
      next(e);
    }
  })
  .patch('/:username/:dbName/:mdlName/:id', ensureAuth, async (req, res, next) => {
    try {
      const UserModel = await getModel(req.params);
      const updatedData = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
      res.send(updatedData);
    } catch(e) {
      next(e);
    }
  })
  .delete('/:username/:dbName/:mdlName/:id', ensureAuth, async (req, res, next) => {
    try {
      const UserModel = await getModel(req.params);
      const deletedData = await UserModel.findByIdAndDelete(req.params.id).lean();
      res.send(deletedData);
    } catch(e) {
      next(e);
    }
  });
