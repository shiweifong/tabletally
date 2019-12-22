exports.index = function(req, res){
    res.render('index', {
        ngController : 'indexController',
        mainClass : 'landing'
    });
};

exports.article = function(req, res){
    res.render('article', {
        ngController : 'articleController',
        mainClass : 'article'
    });
};
