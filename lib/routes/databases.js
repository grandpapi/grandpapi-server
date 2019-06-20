const { Router } = require('express');
const Database = require('../models/Database');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const newDatabase = await Database.create({ ...req.body, username: req.user.nickname, userId: req.user.sub });
      res.send(newDatabase);
    } catch(e) {
      next(e);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const userDbs = await Database.find({ userId: req.params.id });
      res.send(userDbs);
    } catch(e) {
      next(e);
    }
  });
