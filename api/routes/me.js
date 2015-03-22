module.exports = function (app, passport, db) {
  var express = require('express');
  var router = express.Router();
  var User = require('../db/models/user.js');
  var ensureAuth = require('./base.js').prototype.ensureAuth;

  //router.get('/api/me', passport.authenticate('local'), function(req, res) {
  router.get('/api/me', ensureAuth, function(req, res) {
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
