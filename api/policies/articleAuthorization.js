module.exports = function(req, res, next) {
  return Article.findOne({ id: req.params.id }).populate('owner').exec(function(err, article){
    if(err){
      req.flash('message', 'Article not found.');
      res.redirect('/articles');
      return;
    }

    if(article.owner.id == req.session.user.id || req.session.user.admin){
      return next();
    }else{
      req.flash('message', 'Unauthorized process.');
      res.redirect('/articles');
      return;
    }  
  })
}