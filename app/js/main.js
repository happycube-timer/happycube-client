var _ = require('lodash')
  , $ = require('jquery')
  , React = require('react')
  , events = require('./vent.js')
  , Timer = require('./components/Timer.js')
  , Scoreboard = require('./components/Scoreboard.js')
  , $timer;

React.render(Timer(), $('.timer')[0]);
React.render(Scoreboard(), $('.scoreboard')[0]);
