var Backbone = require('backbone')
  , HappyDispatcher = require('../dispatcher.js')
  , SolveActionTypes = require('../constants/solves.js')
  , SolveActions = require('../actions/solves.js')
  , SolvesCollection
  , solvesCollection;

SolvesCollection = Backbone.Collection.extend({
  model: Backbone.Model
, url: '/api/v0/solves'
});

solvesCollection = new SolvesCollection();

solvesCollection.dispatchToken = HappyDispatcher.register(function (action) {
  console.log('dispatch from server/solves');
  switch (action.type) {
    case SolveActionTypes.fetchFromServer:
      solvesCollection.fetch().done(function (response) {
        SolveActions.addSolves(response);
      });
      break;
  }
});

module.exports = solvesCollection;
