/* global navigator */

var React = require('react')
  , _ = require('lodash')
  , Camera = require('../lib/camera.js')
  , $ = require('jquery');

navigator.getUserMedia  = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;

var Scanner = React.createClass({
  getInitialState: function () {
    return {};
  },
  componentDidMount: function () {
    this.$node = $(this.getDOMNode());

    this.camera = new Camera({
      video: this.$node.find('video')
    , canvas: this.$node.find('canvas')
    });

    this.camera.requestAccess();
  },
  render: function () {
    return (
      <div className='scanner-container'>
        <video className="no-show" width="640" height="480" autoPlay></video>
        <canvas className="mirror-image" width="640" height="480"></canvas>
      </div>
    );
  }
});

module.exports = Scanner;
