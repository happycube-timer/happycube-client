/* global navigator, window */

navigator.getUserMedia  = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;

var CanvasHelpers = require('./canvas-helpers.js')
  , EventEmitter = require('events').EventEmitter
  , $ = require('jquery')
  , keymaster = require('keymaster')
  , _ = require('lodash');

class Camera {
  constructor (options) {
    this.emitter = new EventEmitter();

    this.$video = options.video;
    this.$canvas = options.canvas;

    this.$buffer = $(`<canvas class='mirror-image'/>`);
    this.$buffer.insertAfter(this.$canvas);


    this.ctx = this.$canvas[0].getContext('2d');
    this.buffer_ctx = this.$buffer[0].getContext('2d');
    this.buffer_ctx.scale(0.25, 0.25);

    var spacing = 75;
    this.scan_points = this.getScanPointCoordinates(
      this.width / 2 - ( spacing )
    , this.height / 2 - ( spacing )
    , spacing
    );

    keymaster('s', ()=> this.detectCube());
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

    this.scan_points.forEach((point) => {
      CanvasHelpers.drawCircle(point[0], point[1], 15, color);
    });
  }

  detectCube () {

    // get last frame from video
    this.ctx.drawImage(this.$video[0], 0, 0);

    var pixel_data = this.ctx.getImageData(0, 0, this.width, this.height);
    var blobs = [];

    this.scan_points.forEach((point) => {
      var [point_x, point_y] = point;

      var scan_data = this.ctx.getImageData(
        point_x - 25
      , point_y - 25
      , 50
      , 50
      );

      var avg_color = CanvasHelpers.getAverageColor(scan_data);

      var [r, g, b, a] = avg_color;

      blobs.push({
        blob: this.getBlob(point_x, point_y, pixel_data, avg_color, 24)
      , color: `rgb(${r}, ${g}, ${b});`
      });
    });

    /**
     * paint blobs in preview context
     */
    this.buffer_ctx.fillStyle = 'black';
    this.buffer_ctx.fillRect(0, 0, this.width, this.height);
    this.buffer_ctx.fillStyle = 'white';

    blobs.forEach((blob) => {
      this.buffer_ctx.fillStyle = blob.color;
      blob.blob.forEach((blob_point) => {
        this.buffer_ctx.fillRect(blob_point[0], blob_point[1], 1, 1);
      });
    });
  }

  /**
   * get blob using flood fill algorithm
   */
  getBlob (x, y, pixel_data, target_color, threshold) {
    var process_queue = []
      , process_hash = {}
      , blob = []
      , deltas = _.cartesian([0, 1], [0, -1])
      , node
      , avg_color_diff
      , point_x
      , point_y
      , new_point
      , new_point_x
      , new_point_y
      , delta_x
      , delta_y
      , out_of_bounds;

    process_queue.push([x, y]);

    //debugger;

    while (process_queue.length > 0 ) {
      [point_x, point_y] = process_queue.pop();
      process_hash[[point_x, point_y].join(':')] = true;

      node = CanvasHelpers.getPixel(point_x, point_y, pixel_data);

      avg_color_diff = _.reduce(node, (memo, color, index) => {
        return memo + Math.abs(color - target_color[index]);
      }, 0) / 4;

      if ( avg_color_diff <= threshold ) {
        blob.push([point_x, point_y]);

        deltas.forEach((delta) => {
          [delta_x, delta_y] = delta;

          new_point = [point_x + delta_x, point_y + delta_y];
          [new_point_x, new_point_y] = new_point;

          out_of_bounds = _.any([
            new_point_x < 0
          , new_point_x >= pixel_data.width
          , new_point_y < 0
          , new_point_y >= pixel_data.height
          ]);

          if(!process_hash[new_point.join(':')] && !out_of_bounds) {
            process_hash[new_point.join(':')] = true;
            process_queue.push(new_point);
          }
        });
      }
    }

    return blob;
  }

  onStream (stream) {
    this.$video[0].src = window.URL.createObjectURL(stream);
    this.$video.on('play', () => {
      setInterval(() => {
        this.ctx.drawImage(this.$video[0], 0, 0);
        this.drawScanPoints();
      }, 100);
    });
  }

  requestAccess () {
    navigator.getUserMedia({video: true}, this.onStream.bind(this), function () {});
  }
}

module.exports = Camera;
