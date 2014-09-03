module.exports = function(req, res, next){
  console.log('Entering policies')
  if (req.isAuthenticated()){
    console.log(req.user[0]);
    return next();
  }else{
    return res.redirect('/');
    // return res.send(403, { message: 'Not Authorized' });
  }
}