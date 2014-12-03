/** @jsx React.DOM */
/** @jsx React.DOM */

var React = require('react')
  , _ = require('lodash')
  , getClockObject = require('../lib/time-helpers.js').getClockObject
  , vent = require('../vent.js');

var Scoreboard = React.createClass({
  getInitialState: function () {
    return {
      times: JSON.parse(localStorage.getItem('happy_cube:times') || '[]')
    };
  },
  componentDidMount: function () {
    vent.on('time:new', this.onNewTime);
  },
  onNewTime: function (new_time) {
    var times =  this.state.times
      , index = _.sortedIndex(times, new_time);

    times.splice(index, 0, new_time);

    this.setState({
      times: times
    });

    localStorage.setItem('happy_cube:times', JSON.stringify(this.state.times));
  },
  removeTime: function (position) {
    var times = this.state.times;

    times.splice(position, 1);

    this.setState({
      times: times
    });

    localStorage.setItem('happy_cube:times', JSON.stringify(this.state.times));
  },
  render: function () {
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>#</th>
            <th>Time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {_.map(this.state.times, (time, pos) => {
              var time = getClockObject(time);
              return <tr>
                <td>{pos + 1}</td>
                <td>{time.minutes}:{time.seconds}:{time.hundreths}</td>
                <td><span className='glyphicon glyphicon-remove' onClick={_.partial(this.removeTime, pos)}></span></td>
              </tr>
            })
          }
        </tbody>
      </table>
    )
  }
});

module.exports = Scoreboard;
