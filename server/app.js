// Node JS main file

// Add this to the VERY top of the first file loaded in your app
/* Options configured as env variables
ELASTIC_APM_USE
ELASTIC_APM_SERVICE_NAME
ELASTIC_APM_SECRET_TOKEN
ELASTIC_APM_SERVER_URL
*/
// Import configuration
var config = require("./configuration/configuration");

if(config.env !== 'test'){
  var apm = require('elastic-apm-node').start();
}

// Import Packages
var express = require('express');
var cors = require('cors');
var path = require('path');
var file = require('fs');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var helmet = require("helmet"); // Forcing SSL

// Import Routes
var login = require('./routes/login');
var api = require('./routes/api');
var audit = require('./routes/audit');
var userAccounts = require('./routes/userAccounts');
var items = require('./routes/items');
var user = require('./routes/user');
var notifications = require('./routes/notifications');
var invitations = require('./routes/invitations');
var registrations = require('./routes/registrations');
var nodes = require('./routes/nodes');
var commServer = require('./routes/commServer');
var search = require('./routes/search');
var infrastructure = require('./routes/infrastructure');
var operational = require('./routes/operational');

// Import Custom MIDDLEWARES
var jwtauth = require("./middlewares/jwtauth");
var logger = require("./middlewares/logger");

// Start express app
var app = express();

/*
Middlewares
*/
app.use(cors());
if (process.env.env !== 'test'){ // Custom logger, if NO test
  app.use(morgan(':status - :date[iso] - :method - :url - :response-time - :remote-addr', { "stream": logger.stream}));
}
app.use(bodyParser.json({limit: config.maxPayload}));
app.use(bodyParser.urlencoded({limit: config.maxPayload, extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
if(config.ssl){ app.use(helmet()); } // Enforce SSL

/*
Endpoints
*/

// Public API - TODO Oauth/JWT
app.use('/api', api);
// Agent endpoints through comm server
app.use('/commServer', commServer);
// App endpoints
app.use('/login', login);
app.use('/useraccounts', [jwtauth, userAccounts]);
app.use('/nodes', [jwtauth, nodes]);
app.use('/items', [jwtauth, items]);
app.use('/user', [jwtauth, user]);
app.use('/notifications', [jwtauth, notifications]);
app.use('/search', [jwtauth, search]);
app.use('/audit', [jwtauth, audit]);
app.use('/invitations', [invitations]);
app.use('/registrations', [registrations]);
app.use('/infrastructure', [jwtauth, infrastructure]);
app.use('/operational', [jwtauth, operational]);

/*
Error and not found handlers
*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error(req.originalUrl + ' not found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500).send({ error: true, message: err });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500).send({ error: true, message: err });
});

/*
Database connection
*/

// CONNECTING to MONGO
var options = {};
options.useMongoClient = true;
options.ssl = true;
options.sslValidate = true;
if( config.mongoCA && config.mongoCert ){
  options.sslCA = file.readFileSync(config.mongoCA);
  options.sslKey = file.readFileSync(config.mongoCert);
  options.sslCert = file.readFileSync(config.mongoCert);
  options.sslPass = config.mongoPass;
}

mongoose.connect(process.env.VCNT_MNGR_DB, options, function(error){
  if (error){
    logger.error("VMModel: Couldn't connect to data source!" + error);
  } else {
    logger.info("VMModel: Datasource connection established!");
  }
});

/*
Export app module
*/
module.exports = app;
