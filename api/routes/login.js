module.exports = function (app, passport) {

  var express = require('express');
  var router = express.Router();
  var FacebookStrategy = require('passport-facebook').Strategy;
  var LocalStrategy = require('passport-local').Strategy;
  var FACEBOOK_APP_ID = '1446294548945297';
  var FACEBOOK_APP_SECRET = '796e2af28484895cae83b87852f5a913';
  var User = require('../db/models/user.js');
  var Promise = require('bluebird');

  // configure passport
  passport.use(
    new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:4000/auth/facebook/callback",
        enableProof: false
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({
          facebook_id: profile.id
        , name: profile.displayName
        , username: 'fb_' + profile.id
        }, 'facebook_id').then(function (user) {
          done(null, user);
        });
      }
    )
  );

  passport.use(
    new LocalStrategy(
      function (username, password, done) {
        User.where({
          username: username
        })
        .fetch()
        .then(function (user) {
          if ((user && !user.isValidPassword(password)) || !user) {
            //TODO show error message, WTF flash messages?
            done(null, false);
            return;
          }

          debugger;

          done(null, user);
        });
      }
    )
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.query().where({id: id}).then(function(results){
      done(null, results[0]);
    });
    //TODO catch errors o ke ase
  });

  router.get('/auth/facebook', passport.authenticate('facebook', {scope: ['public_profile', 'email']}));
  router.post('/auth/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }));

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

  //app.get('/login', function(req, res){
    //res.send('login');
  //});

  // mount routes
  app.use('/', router);
};
