var operational = module.exports = {};

var logger = require("../../middlewares/logBuilder");
var sUpdate = require("../../services/items/update");
var ctHelper = require("../../services/operational/remove.js");
var sOrganisations = require("../../services/organisations/configuration.js");

// Public functions

/**
 * Enable items
 * @params {String} oid
 * @headers {Object} token
 * @return Confirmation
 */
operational.enable = function(req, res){
  var oid = req.body.o_id || req.body.oid;
  if(!oid || !req.body.typeOfItem){
    res.status(400);
    logger.log(req, res, {type: 'warn', data: "Missing data"});
    res.json({error: false, message: "Data is missing..."});
  } else {
    sUpdate.enableItem(req, res, function(oid, err, success, msg){
      res.json({error: err, message: msg, success: success, oid: oid});
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
  var oid = req.body.o_id || req.body.oid;
  if(!oid || !req.body.typeOfItem){
    res.status(400);
    logger.log(req, res, {type: 'warn', data: "Missing data"});
    res.json({error: false, message: "Data is missing..."});
  } else {
    sUpdate.disableItem(req, res, function(oid, err, success, msg){
      res.json({error: err, message: msg, success: success, oid: oid});
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
    ctHelper.removeContracts(req.body.contracts)
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

/**
 * Remove organisation
 * @params {Array} Objects with organisation info
 * @headers {Object} token
 * @return Confirmation
 */
operational.removeOrganisation = function(req, res){
  var roles = req.body.decoded_token.roles;
  var canContinue = roles.indexOf('devOps') !== -1;
  var noBody = !req.body.id || !req.body.extid;
  console.log("HELLO");
  if(canContinue && !noBody){
    sOrganisations.remove(req, res, req.body, function(err, response){
      res.json({error: err, message: response});
    });
  } else {
    if(!canContinue){
      res.status(401);
      res.json({error: false, message: 'Unauthorized'});
    } else {
      res.status(404);
      res.json({error: false, message: 'Missing or malformed payload'});
    }
  }
};
