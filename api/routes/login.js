

module.exports = function (app, passport) {

  var express = require('express');
  var router = express.Router();
  var FacebookStrategy = require('passport-facebook').Strategy;
  var LocalStrategy = require('passport-local').Strategy;
  var FACEBOOK_APP_ID = '1446294548945297';
  var FACEBOOK_APP_SECRET = '796e2af28484895cae83b87852f5a913';

  // configure passport
  passport.use(
    new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:4000/auth/facebook/callback",
        enableProof: false
      },
      function(accessToken, refreshToken, profile, done) {
        done(null, profile);
      }
    )
  );

  passport.use(
    new LocalStrategy(
      function (username, password, done) {
        console.log('username', username);
        console.log('password', password);
      }
    )
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    done(null, {id: id, foo: 'bar'});
  });

  router.get('/auth/facebook', passport.authenticate('facebook', {scope: ['public_profile', 'email']}));

  router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }),
    function(req, res) {
      console.log('fb callback');
      // Successful authentication, redirect home.
      res.redirect('/');
  });

  router.get('/auth/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  app.get('/', function(req, res){
    res.send('hello world');
  });

  app.get('/login', function(req, res){
    res.send('login');
  });

  app.get('/test', function(req, res){
    res.send(req.user);
    console.log(req.user);
  });

  // mount routes
  app.use('/', router);
};
