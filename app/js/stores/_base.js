var _ = require('lodash')
  , EventEmitter = require('events').EventEmitter;

class BaseStore {
  constructor() {
    this.store = [];
  }

  get(id) {
    return _.findWhere(this.store, {id: id});
  }

  getAll() {
    return this.store;
  }

  add(element) {
    if (_.isArray(element)) {
      this.store.push(...element);
    } else {
      this.store.push(element);
    }
    this.emit('change');
    return element;
  }

  remove(element) {
    this.store = _.without(this.store, element);
    this.emit('change');
    return element;
  }

  addChangeListener(callback) {
    this.on('change', callback);
  }

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }
}

_.extend(BaseStore.prototype, EventEmitter.prototype);

module.exports = BaseStore;
