var React = require('react')
  , Scoreboard = require('../components/Scoreboard.js')
  , Timer = require('../components/Timer.js');


var PlayScreen = React.createClass({
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
            <Scoreboard/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = PlayScreen;
