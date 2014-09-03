/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var passport = require("passport");
module.exports = {
  login: function(req,res){
    console.log('GET - /login')
    res.view("auth/login");
  },

  process: function(req,res){
    console.log('POST - /login')
    passport.authenticate('local-login', function(err, user, info){
      if ((err) || (!user)) {
        req.flash('message', 'Invalid username or password');
        res.redirect('/login');
        return;
      }
      req.logIn(user, function(err){
        if(err){
          req.flash('message', 'Invalid username or password');
          res.redirect('/login');
        }
        req.flash('message', 'Welcome back.');
        return res.redirect('/articles');
      });
    })(req, res);
  },

  signup: function(req,res){
    res.view('auth/signup', { message: '' })
  },

  register: function(req, res){
    console.log('POST -/register')
    passport.authenticate('local-signup', function(err, user, info){
      if ((err) || (!user)) {
        res.redirect('/signup');
        return;
      }
      req.logIn(user, function(err){
        if(err){
          res.redirect('/signup');
        }
        return res.redirect('/articles');
      });
    })(req, res);

  },

  logout: function (req,res){
    console.log('GET - /logout')
    req.logout();
    res.send('logout successful');
  },
  _config: {}
};
