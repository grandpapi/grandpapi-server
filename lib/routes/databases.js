const { Router } = require('express');
const Database = require('../models/Database');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth, async (req, res, next) => {
    try {
      const newDatabase = await Database.create({ ...req.body, username: req.user.nickname, userId: req.user.sub });
      res.send(newDatabase);
    } catch(e) {
      next(e);
    }
  })

  .get('/:id', ensureAuth, async (req, res, next) => {
    try {
      const userDbs = await Database.find({ userId: req.params.id });
      res.send(userDbs);
    } catch(e) {
      next(e);
    }
  })
  
  .get('/', async (req, res, next) => {
    try {
      const publicDbs = await Database.find({ publicAccess: true });
      res.send(publicDbs);
    } catch(e) {
      next(e);
    }
  });
