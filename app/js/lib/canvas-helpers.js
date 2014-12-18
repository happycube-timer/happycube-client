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

  return CanvasHelpers;
};
