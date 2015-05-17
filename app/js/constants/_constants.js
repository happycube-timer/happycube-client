var _ = require('lodash');

module.exports = function (namespace, constants) {
  return _.object(_.map(constants, (constant) => [constant, namespace + ':' + constant]));
};
