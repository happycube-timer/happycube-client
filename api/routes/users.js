module.exports = function (app, passport, db) {
  var util = require('util');

  function UserController () {
    this.initialize();
  }

  util.inherits(UserController, require('./base.js'));

  UserController.prototype.model = require('../db/models/user.js');
  UserController.prototype.collection = require('../db/collections/user.js');

  UserController.prototype.baseUrl = '/api/users/';

  UserController.prototype.create = function (req, res) {
    if (req.user) {
      res.status(403).send('You are already signed up.');
      return;
    }

    //TODO validate existence
    //TODO validate params

    var user = this.model.forge(req.body);

    user
      .setPassword(req.body.password)
      .save()
      .then(function () {
        res.status(200).json(user.toJSON());
      });
  };

  app.use('/', (new UserController()).router);
};
