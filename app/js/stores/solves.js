var happyDispatcher = require('../dispatcher.js')
  , SolveActions = require('../actions/solves.js')
  , SolveActionTypes = require('../constants/solves.js')
  , BaseStore = require('./_base.js');

class SolvesStore extends BaseStore {}

var solvesStore = new SolvesStore();

solvesStore.onCreate = function (action) {
  this.add(action.solve);
};

solvesStore.onAdd = function (action) {
  this.add(action.solves);
};

solvesStore.dispatchToken = happyDispatcher.register(function (action) {
  switch (action.type) {
    case SolveActionTypes.create:
      solvesStore.onCreate(action);
      break;
    case SolveActionTypes.add:
      solvesStore.onAdd(action);
      break;
  }
});

module.exports = solvesStore;
