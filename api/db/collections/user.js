var Base = require('./base.js')
  , User = require('../models/user.js');

module.exports = Base.extend({
  model: User
});
