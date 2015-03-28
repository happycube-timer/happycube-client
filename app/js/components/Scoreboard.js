var React = require('react')
  , _ = require('lodash')
  , getClockString = require('../lib/time-helpers.js').getClockString
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
  getAverage: function (n = this.state.times.length) {
    var avg = _.reduce(_.first(this.state.times, n), (a,b) => a+b, 0) / n;

    return getClockString(avg);
  },
  getBestTime: function () {
    return getClockString(_.first(this.state.times));
  },
  render: function () {
    return (
      <div>
        <div className='scoreboard'>
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
                  return <tr>
                    <td>{pos + 1}</td>
                    <td>{getClockString(time)}</td>
                    <td><span className='glyphicon glyphicon-remove' onClick={_.partial(this.removeTime, pos)}></span></td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>

        <h3>Your stats:</h3>
        <p>Best time: {this.getBestTime()}</p>
        <p>Overall average: {this.getAverage()}</p>
        <p>Best 10 average: {this.getAverage(10)}</p>
      </div>
    )
  }
});

module.exports = Scoreboard;
