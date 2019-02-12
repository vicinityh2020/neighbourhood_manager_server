
// Global Objects

var config = require('../../configuration/configuration');
var logger = require('../../middlewares/logger');
var request = require('request-promise');

// Functions

/*
Communication Server request service
When invoked requires 3 obligatory parameters:
data - Object - Contains payload and may be an empty object  if not required {}
endpoint - String - Endpoint where the request must be addressed
myMethod - String - POST, GET, PUT, DELETE
The headers are preconfigured and the token is stored under /configuration
*/
function callCommServer(data, endPoint, myMethod){
var now = new Date();
if(process.env.env === 'test' || config.env === 'test') return Promise.resolve(true);

  var head = {
    'authorization' : config.commServerToken,
    'Content-Type' : 'application/json; charset=utf-8',
    'Accept' : 'application/json',
    'simple': false
  };

  payload = JSON.stringify(data);

  var options = {};
  options.rejectUnauthorized = config.commServerInsecure;
  // If the server uses certificates, specify the host
  if(!config.commServerInsecure && config.commServerHost) options.servername = config.commServerHost;
  options.method = myMethod;
  options.headers = head;
  options.uri = config.commServerUrl + '/' + endPoint;
  if( config.commserverTimeoutMs && Number(config.commserverTimeoutMs) !== 0 ) options.timeout = config.commserverTimeoutMs || 10000;
  if(myMethod !== 'GET'){ options.body = payload; }

//  return request(options);
 return request(options, function(err, response, body) {
   if(err){
     Promise.reject(err.stack);
   } else {
     if(process.env.env === 'dev' || config.env === 'dev'){
       logger.debug(now + " : Communication Server : " + response.statusCode + " : " + response.request.method + " : " + response.request.uri.path);
     }
     Promise.resolve(response);
   }
 });
}

module.exports.callCommServer = callCommServer;
