var React = require('react')
  , _ = require('lodash')
  , getClockString = require('../lib/time-helpers.js').getClockString
  , vent = require('../vent.js');

var Scoreboard = React.createClass({
  onNewSolve: function (new_solve) {
    //TODO implement
  },
  removeSolve: function (position) {
    //TODO implement
  },
  getAverage: function (n = this.props.solves.length) {
    //FIXME
    var avg = _.reduce(_.map(_(this.props.solves).first(n), (s) => console.log(s)), (a,b) => a+b, 0) / n;

    return 0;
    return getClockString(avg);
  },
  getBestSolve: function () {
    //FIXME
    return 0;
    return getClockString(_.first(this.props.solves));
  },
  render: function () {
    console.log('this.props', this.props);
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
              {_.map(this.props.solves, (solve, pos) => {
                  return <tr>
                    <td>{pos + 1}</td>
                    <td>{getClockString(solve.ellapsed_time)}</td>
                    <td><span className='glyphicon glyphicon-remove' onClick={_.partial(this.removeSolve, pos)}></span></td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>

        <h3>Your stats:</h3>
        <p>Best solve: {this.getBestSolve()}</p>
        <p>Overall average: {this.getAverage()}</p>
        <p>Best 10 average: {this.getAverage(10)}</p>
      </div>
    )
  }
});

module.exports = Scoreboard;
