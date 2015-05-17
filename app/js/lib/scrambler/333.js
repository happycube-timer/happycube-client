var _ = require('lodash');

var turns = [
  "R",
  "R'",
  "R2",
  "F",
  "F'",
  "F2",
  "U",
  "U'",
  "U2",
  "L",
  "L'",
  "L2",
  "B",
  "B'",
  "B2",
  "D",
  "D'",
  "D2"
];

function generate(length) {
  return _.sample(turns, length || 25);
}

module.exports = generate;
