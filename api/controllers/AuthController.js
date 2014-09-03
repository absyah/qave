/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var passport = require("passport");
module.exports = {
  login: function(req,res){
    res.view("auth/login", { message: '' });
  },

  process: function(req,res){
    passport.authenticate('local', function(err, user, info){
      console.log(user)
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
    req.logout();
    res.send('logout successful');
  },
  _config: {}
};
