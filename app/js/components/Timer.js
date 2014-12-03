/** @jsx React.DOM */

var React = require('react')
  , _ = require('lodash')
  , getClockObject = require('../lib/time-helpers.js').getClockObject
  , vent = require('../vent.js')
  , keymaster = require('keymaster');

var Timer = React.createClass({
  getInitialState: function () {
    return {
      minutes: '00'
    , seconds: '00'
    , hundreths: '00'
    , running: false
    };
  },
  componentDidMount: function () {
    keymaster('space', this.onSpaceBar);
  },
  startTimer: function () {
    console.log('start timer');
    this.start_time = Date.now();

    this.interval = setInterval(() => {
      console.log('interval');
      var now = Date.now()
        , start_time = this.start_time
        , ellapsed_ms = now - start_time;

      this.setState(_.extend({ ellapsed: ellapsed_ms} , getClockObject(ellapsed_ms)));
    }, 60);
  },
  stopTimer: function () {
    console.log('stop timer');
    clearInterval(this.interval);
    vent.emit('time:new', this.state.ellapsed);
  },
  onSpaceBar: function () {
    if (!this.state.running) {
      this.startTimer();
    } else {
      this.stopTimer();
    }

    this.setState({
      running: !this.state.running
    });
  },
  render: function () {
    return (
      <div onKeyDown={this.onKeyDown}>
        <div>
          {this.state.minutes}:{this.state.seconds}.{this.state.hundreths}
        </div>
      </div>
    )
  }
});

module.exports = Timer;
