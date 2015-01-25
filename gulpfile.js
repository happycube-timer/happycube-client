// Include gulp
var gulp = require('gulp');

// Plugins
var browserify = require('gulp-browserify');
var connect = require('gulp-connect');
var to5ify = require('6to5ify');
var reactify = require('reactify');
var sass = require('gulp-sass');
var atomify = require('atomify');
var browserSync = require('browser-sync');
var proxy = require('proxy-middleware');
var url = require('url');
var reload = browserSync.reload;

// Concatenate & Minify JS
gulp.task('scripts', function() {
  // Single entry point to browserify
  gulp.src('./app/js/main.js')
    .pipe(
      browserify({
        debug : true //enable source maps
      , transform: [reactify, to5ify]
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

// Browser sync, serve static files and proxy api requests
gulp.task('browser-sync', function () {
  var api_proxy
    , auth_proxy;

  api_proxy = url.parse('http://localhost:3000/api/');
  api_proxy.preserveHost = true;
  api_proxy.route = '/api';

  auth_proxy = url.parse('http://localhost:3000/auth/');
  auth_proxy.preserveHost = true;
  auth_proxy.route = '/auth';

  browserSync({
    port: 4000
  , open: false
  , server: {
      baseDir: './dist'
    , middleware: [
        proxy(api_proxy)
      , proxy(auth_proxy)
      ]
    }
  });
});

gulp.task('watch', function () {
  gulp.watch(['./app/**/*.less'], ['stylesheets', 'browser-reload']);
  gulp.watch(['./app/**/*.html'], ['html', 'browser-reload']);
  gulp.watch(['./app/**/*.js'], ['scripts']);
});

// Default Task
gulp.task('default', [
  'browser-sync'
, 'scripts'
, 'html'
, 'stylesheets'
, 'assets'
, 'watch'
]);
