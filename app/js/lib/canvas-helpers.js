var _ = require('lodash');

module.exports = function (ctx) {

  var CanvasHelpers = {};

  /**
   * drawCircle
   */
  CanvasHelpers.drawCircle = function (x, y, radius, color) {
    var colorRGB = color.join(', ');

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = `rgba(${colorRGB}, 0.3)`;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = `rgba(${colorRGB}, 0.75)`;
    ctx.stroke();
  };

  CanvasHelpers.getPixel = function(x, y, pixel_data) {
    var pixel_i =  (y * pixel_data.width + x )* 4;

    return [
      pixel_data.data[pixel_i]
    , pixel_data.data[pixel_i + 1]
    , pixel_data.data[pixel_i + 2]
    , pixel_data.data[pixel_i + 3]
    ];
  };

  CanvasHelpers.getAverageColor = function(pixel_data) {
    var avg_color = _.reduce(pixel_data.data, (memo, value, index) => {
      var i = index % 4;
      memo[i] += value;
      return memo;
    }, [0, 0, 0, 0]);

    var n = pixel_data.data.length / 4;

    return _.map(avg_color, (c) => Math.floor(c / n));
  };

  return CanvasHelpers;
};
