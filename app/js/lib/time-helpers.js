var TimeHelpers = {}
  , _ = require('lodash');

TimeHelpers.lpad = function (number, n_padding) {
  var padding = _(n_padding).times(() => '0').join('');
  return (padding + number).slice(-padding.length);
};

TimeHelpers.getClockObject = function (ms) {
  return {
    hundreths: TimeHelpers.lpad(Math.floor(((ms / 1000) % 1 ) * 100), 2)
  , seconds: TimeHelpers.lpad(Math.floor((ms / 1000) % 60), 2)
  , minutes: TimeHelpers.lpad(Math.floor((ms / 1000 / 60)), 2)
  };
};

TimeHelpers.getClockString = function (ms) {
  var {minutes, seconds, hundreths} = TimeHelpers.getClockObject(ms);

  return `${minutes}:${seconds}.${hundreths}`;
};

module.exports = TimeHelpers;
