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
    res.view("auth/login", { message: '' });
  },

  process: function(req,res){
    console.log('POST - /login')
    passport.authenticate('local', function(err, user, info){
      if ((err) || (!user)) {
        res.redirect('/login');
        return;
      }
      req.logIn(user, function(err){
        if(err){
          res.redirect('/login');
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
