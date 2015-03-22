var db = require('../index.js');

module.exports = db.Model.extend({
  tableName: 'solves'
, hasTimestamps: true
});

