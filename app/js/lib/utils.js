var _ = require('lodash')
  , utils = {};


utils.average = function (list, n=list.length) {
  return _.reduce(_.first(list, n), (a,b) => a+b, 0) / n;
};


utils.cartesian = function (...groups) {
  return _.reduce(groups, function(a, b) {
    return _.flatten(_.map(a, function(x) {
        return _.map(b, function(y) {
            return x.concat([y]);
        });
    }), true);
  }, [ [] ]);
};

_.mixin(utils);
