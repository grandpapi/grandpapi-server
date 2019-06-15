const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth(), (req, res, next) => {
    console.log('TESTING user db post', req.body);
    res.send(req.body);
  });
