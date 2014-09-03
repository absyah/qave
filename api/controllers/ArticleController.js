/**
 * ArticleController
 *
 * @description :: Server-side logic for managing articles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    // Index
    index : function(req, res) {
        console.log('GET - /articles');
         return Article.find({ owner: req.user[0].id }).populate('owner').exec(function(err, articles) {
            return res.view('articles/index.ejs', { articles: articles });
        });
    },

    // Show action
    show : function(req, res) {
        console.log('GET - /article/:id');
        return Article.findOne({ id: req.params.id, owner: req.user[0].id }).exec(function(err, article) {
            if(!article){
                res.statusCode = 404;
                return res.send({ error: 'Article not found.' });
            }

            if(!err){
                return res.view('articles/show.ejs', { article: article })
            }else{
                res.statusCode = 500;
                console.log('Internal server error(%d): %s', res.statusCode, err)
                return res.send({ error: 'Server error' });
            }

        });
    },

    // Add / new action
    add : function(req, res) {
        console.log('GET - /article/new');
        res.view('articles/add.ejs', { message: ''})
    },

    // Create action
    create : function(req, res){
        console.log('POST - /article');
        var articleObj = {
                            title   : req.body.title, 
                            content : req.body.content,
                            owner   : req.user[0].id
        };

        return Article.create(articleObj).exec(function(err, article){
            if(err){
                console.log('Error while saving article : ' + err);
                res.send({  error: err });
                return
            }else{
                console.log('Article created');
                res.redirect('/articles')
            }
        });
    },

    // Edit action
    edit : function(req, res) {
        console.log('GET - /article/:id/edit');
        return Article.findOne({ id: req.params.id , owner: req.user[0].id }).exec(function(err, article){
             if(!article){
                res.statusCode = 404;
                return res.send({ error: 'Article not found.' });
            }

            if(!err){
                console.log(article)
                return res.view('articles/edit.ejs', { article: article, message: '' })
            }else{
                res.statusCode = 500;
                console.log('Internal server error(%d): %s', res.statusCode, err)
                return res.send({ error: 'Server error' });
            }
        });
    },

    // Update action
    update : function(req, res) {
        console.log('PUT - /article/:id');
        var articleObj = {
                            title   : req.body.title,
                            content : req.body.content,
                            owner   : req.user[0].id
        }
        return Article.update({ id: req.params.id }, articleObj).exec(function(err, article){
            if(!err){
                console.log(article)
                return res.redirect('/articles')
            }else{
                res.statusCode = 500;
                console.log('Internal server error(%d): %s', res.statusCode, err)
                return res.send({ error: err });
            }
        })
    },

    // Destroy action
    destroy: function(req, res) {
        console.log('DELETE - /article:id');
        return Article.destroy({ id: req.params.id, owner: req.user[0].id }).exec(function(err){
            if(err){
                res.statusCode = 500;
                console.log('Internal server error(%d): %s', res.statusCode, err)
                return res.send({ error: err });
            }else{
                console.log('Article destroyed.')
                return res.redirect('/articles')
            }
        })
    }

	
};