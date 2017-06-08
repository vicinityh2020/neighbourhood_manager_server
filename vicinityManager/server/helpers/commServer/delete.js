var config = require('../../configuration/configuration');
var logger = require('../../middlewares/logger');
var request = require('request');
require('request-debug')(request);


function deleteResource(req, res, next) {

  var endPoint = req.params.endPoint;
  var auth = req.headers.authorization;
  var format = 'application/json';

  if(req.body.route){
    var endPoint = req.params.endPoint + '/' + req.body.route;
  }

  var head = {
    'authorization' : auth,
    'Content-Type' : format,
    'Accept' : format
  };

  request.delete({
    headers: head,
    uri: config.commServerUrl + '/' + endPoint,
  }, function(err, response, body) {
      logger.debug('REQUEST RESULTS:', err, response.statusCode, body);
      res.json({'success':true,'message':body});
  });

}

module.exports.deleteResource = deleteResource;
