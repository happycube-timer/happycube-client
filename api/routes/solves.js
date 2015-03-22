module.exports = function (app, passport, db) {
  var util = require('util');

  function SolveController () {
    this.initialize();
  }

  util.inherits(SolveController, require('./base.js'));

  SolveController.prototype.model = require('../db/models/solve.js');
  SolveController.prototype.collection = require('../db/collections/solve.js');

  SolveController.prototype.baseUrl = '/api/solves/';

  app.use('/', (new SolveController()).router);
};
