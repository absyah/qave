module.exports = function(req, res, next){
  console.log('Entering policies')
  if (req.isAuthenticated() && req.session.user){
    console.log(req.session.user);
    return next();
  }else{
    req.flash('message', 'Please login to continue');
    return res.redirect('/');
    // return res.send(403, { message: 'Not Authorized' });
  }
}