var db = require('../index.js');
var bcrypt = require('bcrypt');

var User = {};

User.tableName = 'users';

User.hasTimestamps = true;

/**
 * setPassword
 */
User.setPassword = function (password) {
  //TODO store salt generator in env variable
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  this.set('password', hash);
  return this;
};

/**
 * isValidPassword
 */
User.isValidPassword = function (password) {
  return bcrypt.compareSync(password, this.get('password'));
};

module.exports = db.Model.extend(User);
