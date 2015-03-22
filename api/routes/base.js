var express = require('express')
  , DEFAULT_PAGE_SIZE = 30
  , _ = require('lodash');

function Base (router) {
}

/**
 * Prototype.initializes
 *
 */
Base.prototype.initialize = function () {
  this.router = express.Router();
  this.setupRoutes();
};

/**
 * prototype.get
 */
Base.prototype.get = function (req, res) {
  this.model.where('id', req.params.id).fetch().then(function (results) {
    if (!results) {
      res.sendStatus(404);
      return;
    }

    res.send(results.toJSON());
  });
};

/**
 * prototype.index
 */
Base.prototype.index = function (req, res) {
  var pageNumber = req.query.page_number || 1
    , pageSize = req.query.page_size || DEFAULT_PAGE_SIZE;

  this.collection
    .query('offset', (pageNumber - 1) * pageSize)
    .query('limit', pageSize)
    .fetch()
    .then(function (results) {
    if (!results) {
      res.sendStatus(404);
      return;
    }

    res.send(results.toJSON());
  });
};

/**
 * prototype.create
 */
Base.prototype.create = function (req, res) {
  //TODO validate payload

  var newModel = this.model.forge(req.body);

  newModel.save().then(function () {
    res.send(newModel);
  });
};

/**
 * prototype.update
 */
Base.prototype.update = function (req, res) {
};

/**
 * prototype.destroy
 */
Base.prototype.destroy = function (req, res) {
};

/**
 * prototype.ensureAuth
 */
Base.prototype.ensureAuth = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/');
  }
};

/**
 * Setups routes
 *
 */
Base.prototype.setupRoutes = function () {
  this.router.get(this.baseUrl, this.ensureAuth, this.index.bind(this));
  this.router.get(this.baseUrl + ':id', this.ensureAuth, this.get.bind(this));
  this.router.post(this.baseUrl, this.ensureAuth, this.create.bind(this));
  this.router.put(this.baseUrl + '/:id', this.ensureAuth, this.update);
  this.router.delete(this.baseUrl + '/:id', this.ensureAuth, this.destroy);
};


module.exports = Base;
