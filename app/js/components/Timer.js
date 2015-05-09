var React = require('react')
  , _ = require('lodash')
  , getClockString = require('../lib/time-helpers.js').getClockString
  , vent = require('../vent.js')
  , keymaster = require('keymaster');

var Timer = React.createClass({
  getInitialState: function () {
    return {
      ellapsed: 0
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

      this.setState({ellapsed: ellapsed_ms});
    }, 60);
  },
  stopTimer: function () {
    console.log('stop timer');
    clearInterval(this.interval);
    vent.emit('time:new', this.state.ellapsed);
  },
  onSpaceBar: function () {
    this.toggleTimer();
  },
  onClick: function () {
    this.toggleTimer();
  },
  toggleTimer: function () {
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
      <div onClick={this.onClick}>
        <div>
          {getClockString(this.state.ellapsed)}
        </div>
      </div>
    );
  }
});

module.exports = Timer;
