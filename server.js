/**
 * GLOBAL MODULES
 */

// set the environment
process.env.NODE_ENV = 'production';

_require = function(name) { return require(__dirname + name); };

_ = require('underscore');
express = require('express');
request = require('request');
http = require('http');
expressLayouts = require('express-ejs-layouts');
morgan = require('morgan');
request = require('request');
bodyParser = require('body-parser');
methodOverride = require('method-override');
async = require('async');
mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
moment = require('moment');
qs = require('qs');
config = require('./config');
cron = require('node-cron');


/**
 * APP ROUTES
 */
// Web Pages
var environment = process.env.NODE_ENV, app = express();

/**
 * HELPERS
 */

apiHelper = _require('/helpers/api');
dateTimeHelper = _require('/helpers/dateTime');

/**
 * CUSTOM MODULES
 */
var routes = require('./routes'),
    api = require('./routes/api');


/**
 * MONGODB CONNECTION
 */

connection = mongoose.connect('mongodb+srv://tabletally:s8944896d@cluster0-kdn9k.gcp.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true });


/**
 * APP INIT CONFIGURATIONS
 */

app.set('port', process.env.PORT || 8000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(morgan('common'));
app.use(bodyParser.urlencoded({extended: true,limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(methodOverride());
app.set('trust proxy', 1); //trust first proxy

app.use('/static', express.static('public'));

// app.use(cors());

app.get('/', routes.index);


// APIs
app.get('/api/:base/:api', api);
app.post('/api/:base/:api', api);


/**
 * SERVER START
 */

http.createServer(app).listen(app.get('port'), function () {
    var production = environment + ' mode';
    console.log(production + ' - server listening on port ' + app.get('port'));
});

process.on('uncaughtException', function (err) {
    var errorThread = err.stack;
    console.log(errorThread);
});

process.on( 'SIGINT', function() {
    //shutting down
    console.log('Shutting down MongoDB connection');
    mongoose.connection.close();

    // some other closing procedures go here
    console.log('Exiting');
    process.exit();
});
