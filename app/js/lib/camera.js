/* global navigator, window */

navigator.getUserMedia  = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;

var CanvasHelpers = require('./canvas-helpers.js')
  , EventEmitter = require('events').EventEmitter
  , $ = require('jquery')
  , _ = require('lodash');

class Camera {
  constructor (options) {
    this.emitter = new EventEmitter();

    this.$video = options.video;
    this.$canvas = options.canvas;

    this.$buffer = $(`<canvas width=${this.width / 4} height=${this.height / 4}/>`);
    this.$buffer.insertAfter(this.$canvas);


    this.ctx = this.$canvas[0].getContext('2d');
    this.buffer_ctx = this.$buffer[0].getContext('2d');
    this.buffer_ctx.scale(0.25, 0.25);

    CanvasHelpers = CanvasHelpers(this.ctx);

    this.drawScanPoints();
  }

  getScanPointCoordinates (base_x=0, base_y=0, spacing=50) {
    var coordinates = [];

    _.times(3, (x) => {
      _.times(3, (y) => {
        coordinates.push([base_x + spacing * x, base_y + spacing * y]);
      });
    });

    return coordinates;
  }

  get width () {
    return this.$canvas.attr('width');
  }

  get height () {
    return this.$canvas.attr('height');
  }

  drawScanPoints () {
    var spacing = 75
      , color = [255, 255, 255]
      , points_x = this.width / 2 - ( spacing )
      , points_y = this.height / 2 - ( spacing );

    this.getScanPointCoordinates(points_x, points_y, spacing).forEach((point) => {
      CanvasHelpers.drawCircle(point[0], point[1], 15, color);
    });
  }

  detectMotion () {
    //var p = new Parallel(raw_pixels.data);

    //p.reduce(

    //var raw_pixels = this.ctx.getImageData(0, 0, this.width, this.height);
    //this.ctx.scale(0.25, 0.25);
    //this.ctx.drawImage(this.$video[0], 0, 0);
    //this.ctx.scale(1, 1);
      //, rgba_pixels = _.groupBy(raw_pixels.data, (pixel, i) => 'rgba'.split('')[i % 4]);

    //var r_avg = _.average(rgba_pixels.r)
      //, g_avg = _.average(rgba_pixels.g)
      //, b_avg = _.average(rgba_pixels.b)
      //, a_avg = _.average(rgba_pixels.a);

    //var avg = _.reduce(raw_pixels.data, function (memo, pixel, i) {
      //memo['rgba'[i % 4]] += (pixel / raw_pixels.data.length);
      //return memo;
    //}, {r: 0, g: 0, b: 0, a: 0});

    //console.log('avg', avg);

    //console.log('[r_avg, g_avg, a_avg]', [r_avg, g_avg, a_avg]);

  }

  detectCube () {

    // monochrome blobs and count changes
  }

  onStream (stream) {
    this.$video[0].src = window.URL.createObjectURL(stream);
    this.$video.on('play', () => {
      setInterval(() => {

        this.ctx.drawImage(this.$video[0], 0, 0);
        this.buffer_ctx.drawImage(this.$video[0], 0, 0);

        this.detectMotion();
        //this.drawScanPoints();
      }, 100);
    });
  }

  requestAccess () {
    navigator.getUserMedia({video: true}, this.onStream.bind(this), function () {});
  }
}

module.exports = Camera;
