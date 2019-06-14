const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth(), (req, res, next) => {
    const { nickname } = req.body;
    console.log('TESTING POST', nickname);
    res.send('WE GOT IT');
  });
