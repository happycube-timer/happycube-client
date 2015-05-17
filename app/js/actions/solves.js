var HappyDispatcher = require('../dispatcher.js')
  , SolveActionTypes = require('../constants/solves.js');

module.exports = {
  fetchSolves: function () {
    HappyDispatcher.dispatch({
      type: SolveActionTypes.fetch
    });
  },

  fetchFromServer: function () {
    HappyDispatcher.dispatch({
      type: SolveActionTypes.fetchFromServer
    });
  },

  addSolves: function (solves) {
    HappyDispatcher.dispatch({
      type: SolveActionTypes.add
    , solves: solves
    });
  },

  createSolve: function (solve) {
    HappyDispatcher.dispatch({
      type: SolveActionTypes.create
    , solve: solve
    });
  },

  removeSolve: function (solve) {
    HappyDispatcher.dispatch({
      type: SolveActionTypes.remove
    , solve: solve
    });
  }
};
