var db = require('../index.js')
  , Promise = require('bluebird');

module.exports = db.Collection.extend({}, {
  findOrCreate: function (attributes, idAttribute) {
    var cond = {}
      , idAttribute = idAttribute || 'id';

    cond[idAttribute] = attributes[idAttribute];

    var self = this;

    function createMaybe (results) {
      if (results.length > 0) {
        console.log('found model', results[0]);
        return Promise.resolve(results[0]);
      } else {
        console.log('forging new model');
        var model = self.forge([attributes]).first();

        return Promise.resolve(self.forge([attributes]).first().save());
      }
    }

    return self.query()
            .where(cond)
            .then(createMaybe);
  }
});
