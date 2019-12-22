exports.index = function(req, res){
    res.render('index', {
        ngController : 'indexController',
        mainClass : 'landing'
    });
};