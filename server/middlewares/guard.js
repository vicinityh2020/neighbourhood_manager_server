/**
Gateway token validation middleware
Using JWT and asynchronous key encryption
Used as gateway authentication method
*/
var jwt = require('jsonwebtoken');
var logger = require("../middlewares/logBuilder");
var opKey = require("../models/vicinityManager").gatewayKey;

module.exports = function(req, res, next) {
  var auth = req.headers['authorization'] || req.headers['X-ACCESS-TOKEN'];
  var publicKey = "";
  var token = "";
  var info;
  if (auth && auth.startsWith('Bearer ')) {
    try{
      token = auth.slice(7, auth.length);
      info = getInfo(token);
      opKey.findOne({agid: info.iss}, {key: 1, _id: 0})
      .then(function(response){
        publicKey = response.key;
        return validate(token, publicKey);
      })
      .then(function(response){
        req.body.token = { agid: info.iss };
        next();
      })
      .catch(function(err){
        logger.log(req, res, {type: 'error', data: "JWT Validation error: " + err.text});
        next();
      });
    } catch(err) {
      logger.log(req, res, {type: 'error', data: "JWT Validation error: " + err.text});
      next();
    }
  } else {
    req.body.token = { agid: null };
    next();
  }
};

// Private functions

// Validate origin and ownership of the message
function validate(token, pubkey){
 return new Promise(function(resolve, reject) {
   jwt.verify(token, pubkey, { aud: 'NM' }, function(err, decoded) {
      if(err) reject(err);
      resolve(decoded);
    });
 });
}

// Extract agid info from the original token
function getInfo(x){
  var i = x.indexOf(".");
  var j = x.lastIndexOf(".");
  var info = x.substring(i, j);
  info = new Buffer(info, 'base64');
  info = info.toString("ascii");
  info = JSON.parse(info);
  return info;
}
