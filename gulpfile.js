// Include gulp
var gulp = require('gulp');

// Plugins
var browserify = require('gulp-browserify');
var connect = require('gulp-connect');
var es6ify = require('es6ify');
var reactify = require('reactify');
var sass = require('gulp-sass');
var atomify = require('atomify');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// Concatenate & Minify JS
gulp.task('scripts', function() {
  // Single entry point to browserify
  gulp.src('./app/js/main.js')
    .pipe(
      browserify({
        debug : true, //enable source maps
        transform: [reactify, es6ify]
      })
    )
    .pipe(gulp.dest('./dist/js/'));

});

// Copy assets to the dist folder
gulp.task('assets', function () {
  gulp.src('./assets/**/*')
    .pipe(gulp.dest('./dist/assets'));

  gulp.src('./node_modules/bootstrap/dist/fonts/*')
    .pipe(gulp.dest('./dist/fonts'));
});

// Dev server
gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: false,
    port: 4001
  });
});

// Stylesheets
gulp.task('stylesheets', function (done) {
  var atomifyConf = {
    css: {
      entry: './app/stylesheets/main.less'
    , output: './dist/css/main.css'
    }
  };

  atomify(atomifyConf, done);
});

// Reload browser
gulp.task('browser-reload', function (done) {
  browserSync.reload();
  done();
});

// Copy html to dist folder
gulp.task('html', function () {
  return gulp.src('./app/**/*.html').pipe(gulp.dest('./dist'));
});

gulp.task('browser-sync', function () {
  browserSync({
    proxy: 'localhost:4001'
  , port: 4000
  , open: false
  });
});

gulp.task('watch', function () {
  gulp.watch(['./app/**/*.less'], ['stylesheets', 'browser-reload']);
  gulp.watch(['./app/**/*.html'], ['html', 'browser-reload']);
  gulp.watch(['./app/**/*.js'], ['scripts']);
});

// Default Task
gulp.task('default', [
  'connect'
, 'browser-sync'
, 'scripts'
, 'html'
, 'stylesheets'
, 'assets'
, 'watch'
]);
