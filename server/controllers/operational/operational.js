var operational = module.exports = {};

var logger = require("../../middlewares/logBuilder");
var sUpdate = require("../../services/items/update");
var ctHelper = require("../../services/operational/remove.js");

// Public functions

/**
 * Enable items
 * @params {String} oid
 * @headers {Object} token
 * @return Confirmation
 */
operational.enable = function(req, res){
  if(!req.body.o_id || !req.body.typeOfItem){
    res.status(400);
    logger.log(req, res, {type: 'warn', data: "Missing data"});
    res.json({error: false, message: "Data is missing..."});
  } else {
    sUpdate.enableItem(req, res, function(err, response, success){
      res.json({error: err, message: response});
    });
  }
};

/**
 * Disable items
 * @params {String} oid
 * @headers {Object} token
 * @return Confirmation
 */
operational.disable = function(req, res){
  if(!req.body.o_id || !req.body.typeOfItem){
    res.status(400);
    logger.log(req, res, {type: 'warn', data: "Missing data"});
    res.json({error: false, message: "Data is missing..."});
  } else {
    sUpdate.disableItem(req, res, function(err, response, success){
      res.json({error: err, message: response});
    });
  }
};

/**
 * Remove contracts
 * @params {Array} Objects with contract info
 * @headers {Object} token
 * @return Confirmation
 */
operational.removeContracts = function(req, res){
  var roles = req.body.decoded_token.roles;
  var canContinue = roles.indexOf('devOps') !== -1;
  if(canContinue){
    ctHelper.remove(req.body.contracts)
    .then(function(response){
      res.json({error: false, message: response});
    })
    .catch(function(err){
      res.status(500);
      res.json({error: true, message: err});
    });
  } else {
    res.status(401);
    res.json({error: false, message: 'Unauthorized'});
  }
};
