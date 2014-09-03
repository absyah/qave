var passport    = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  bcrypt = require('bcrypt');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use('local-login', new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }).exec(function(err, user) {
      console.log('Entering passport config login.')
      console.log(user);
      if (err) { return done(null, err); }
      if (!user || user.length < 1) { return done(null, false, { message: 'Incorrect User'}); }
      bcrypt.compare(password, user.password, function(err, res) {
        if (!res) return done(null, false, { message: 'Invalid Password'});
        return done(null, user);
      });
    });
  })
);

passport.use('local-signup', new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username}).exec(function(err, user){
      if (err) { return done(null, err); }
      if (user){
        return done(null, false, { message: 'User exists.' });
      }else{
        User.create({ username: username, password: password }).exec(function(err, user){
          if(err){
            throw err;
          }else{
            return done(null, user);
          }
        })
      }
    })
  })
);

module.exports = {
 http: {
    customMiddleware: function(app){
      console.log('midleware for passport');
      app.use(passport.initialize());
      app.use(passport.session());
    }
  }
};