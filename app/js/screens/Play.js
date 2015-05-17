var _ = require('lodash')
  , React = require('react')
  , SolvesStore = require('../stores/solves.js')
  , SolvesServer = require('../server/solves.js')
  , SolvesActions = require('../actions/solves.js')
  , Scoreboard = require('../components/Scoreboard.js')
  , Timer = require('../components/Timer.js');


var PlayScreen = React.createClass({
  componentDidMount: function () {
    SolvesStore.addChangeListener(this.onChange);
  },
  getInitialState: function () {
    return {
      solves: []
    };
  },
  onChange: function () {
    this.setState({
      solves: _.sortBy(SolvesStore.getAll(), 'ellapsed_time')
    });
  },
  render: function () {
    return (
      <div>
        <div className="col-md-8">
          <div className="timer">
            <Timer/>
          </div>
        </div>
        <div className="col-md-4">
          <h3>
            Your times:
          </h3>
          <div className="stats-container">
            <Scoreboard solves={this.state.solves}/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = PlayScreen;
