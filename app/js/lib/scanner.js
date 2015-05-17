var EventEmitter = require('events').EventEmitter;

class Scanner {
  constructor (options) {
    this.camera = options.camera;

    this.camera.emitter.on('frame', this.onFrame.bind(this));
  }

  onFrame (context) {
  }
}

module.exports = Scanner;
