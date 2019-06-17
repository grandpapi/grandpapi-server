const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Database = require('../models/Database');

module.exports = Router()
  .post('/', ensureAuth(), async (req, res, next) => {
    try {
      const newDatabase = await Database.create({ ...req.body, username: req.user.nickname, userId: req.user.sub });
      res.send(newDatabase);
    } catch(e) {
      next(e);
    }
  });
