// Include gulp
var gulp = require('gulp');

// Plugins
var browserify = require('gulp-browserify');
var connect = require('gulp-connect');
var es6ify = require('es6ify');
var reactify = require('reactify');
var sass = require('gulp-sass');
var atomify = require('atomify');

// Concatenate & Minify JS
gulp.task('scripts', function() {
  // Single entry point to browserify
  gulp.src('./app/js/main.js')
    .pipe(
      browserify({
        insertGlobals : true,
        debug : true, //enable source maps
        transform: [reactify, es6ify]
      })
    )
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: false,
    port: 4000
  });
});

gulp.task('atomify', function () {
  var atomifyConf = {
    css: {
      entry: './app/stylesheets/main.less'
    , output: './dist/css/main.css'
    }
  };

  atomify(atomifyConf);
});

gulp.task('html', function () {
  return gulp.src('./app/**/*.html').pipe(gulp.dest('./dist'));
});

gulp.task('watch', function () {
  gulp.watch(['./app/**/*.less'], ['atomify']);
  gulp.watch(['./app/**/*.html'], ['html']);
  gulp.watch(['./app/**/*.js'], ['scripts']);
});

// Default Task
gulp.task('default', ['scripts', 'html', 'atomify', 'connect', 'watch']);
