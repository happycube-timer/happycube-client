module.exports = function (app, passport, db) {
  var express = require('express');
  var router = express.Router();
  var User = require('../db/models/user.js');

  /* GET users listing. */
  router.get('/api/users/:id', function(req, res) {
    console.log(req.user);
    console.log(req.params.id);
    res.send('respond with a resource');
  });

  // mount routes
  app.use('/', router);
};
