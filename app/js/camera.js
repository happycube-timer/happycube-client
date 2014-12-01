var _ = require('lodash')
  , $ = require('jquery');

navigator.getUserMedia  = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;

var $video = $('.video')
  , $canvas = $('.canvas')
  , ctx = $canvas[0].getContext('2d');

function onStream(stream) {
  $video[0].src = window.URL.createObjectURL(stream);
  $video.on('play', function () {
    setInterval(function () {
      ctx.drawImage($video[0], 0, 0);
    }, 100);
  });
  console.log('on stream');
}

function onError() {}

navigator.getUserMedia({video: true}, onStream, onError);
