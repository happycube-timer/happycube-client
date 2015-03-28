var React = require('react')
  , Scanner = require('../components/Scanner.js');

var TrainScreen = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Train</h1>
        <Scanner/>
      </div>
    );
  }
});

module.exports = TrainScreen;
