module.exports = function (app, passport, db) {
  var express = require('express');
  var router = express.Router();
  var User = require('../db/models/user.js');

  /* GET users listing. */
  router.get('/api/me', function(req, res) {
    if (req.user) {
      //TODO lol omit password
      res.send(req.user);
    } else {
      res.status(404).send('Not logged in');
    }
  });

  // mount routes
  app.use('/', router);
};
