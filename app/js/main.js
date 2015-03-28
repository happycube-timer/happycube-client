var _ = require('lodash')
  , $ = require('jquery')
  , React = require('react')
  , Play = require('./screens/Play.js')
  , Train = require('./screens/Train.js')
  , Learn = require('./screens/Learn.js')
  , Router = require('react-router')
  , LoginModal = require('./components/LoginModal.js')
  , Link = Router.Link
  , Route = Router.Route
  , DefaultRoute = Router.DefaultRoute
  , RouteHandler = Router.RouteHandler;

/**
 * Load _.mixins
 */
require('./lib/utils.js');
require('6to5/polyfill');

var App = React.createClass({
  render: function () {
    return (
      <div className="container">
        <header className="logo">
          <h1>
            <img src="/assets/cube.svg"/>
            <span>happycube</span>
          </h1>
          <div className="navbar pull-right">
            <LoginModal/>
          </div>
        </header>
        <div className="row">
          <RouteHandler/>
        </div>
        <div className="help">Press "Spacebar" to Start/Stop timer.</div>
      </div>
    );
  }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="play" handler={Play}/>
    <Route name="train" handler={Train}/>
    <Route name="learn" handler={Learn}/>
    <Route name="_=_" handler={Play}/>
    <DefaultRoute handler={Play}/>
  </Route>
);

Router.run(routes, function (Handler) {
  console.log('Handler', Handler);
  React.render(<Handler/>, $('.js-content')[0]);
});
