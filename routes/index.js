exports.index = function(req, res){
    res.render('index', {
        ngController : 'indexController',
        mainClass : 'landing'
    });
};

exports.dashboard = function(req, res){
    res.render('index', {
        ngController : 'dashboardController',
        mainClass : 'dashboard'
    });
};

exports.signup = function(req, res){
    res.render('index', {
        ngController : 'signupController',
        mainClass : 'signup'
    });
};

exports.login = function(req, res){
    res.render('index', {
        ngController : 'loginController',
        mainClass : 'login'
    });
};