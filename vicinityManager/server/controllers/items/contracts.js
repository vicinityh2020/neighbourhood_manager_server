// Global objects and variables

var mongoose = require('mongoose');
var logger = require("../../middlewares/logger");
var ctHelper = require("../../services/contracts/contracts.js");
var contractOp = require('../../models/vicinityManager').contract;
var userOp = require('../../models/vicinityManager').user;

/*
Create contracts
*/
function createContract(req, res){
  var data = req.body;
  var uid = mongoose.Types.ObjectId(req.body.decoded_token.uid);
  var mail = req.body.decoded_token.sub;
  ctHelper.creating(data, uid, mail, function(err, response){
    res.json({error: err, message: response});
  });
}

/*
Accept contracts
*/
function acceptContract(req, res){
  var id = req.params.id;
  var uid = mongoose.Types.ObjectId(req.body.decoded_token.uid);
  var mail = req.body.decoded_token.sub;
  ctHelper.accepting(id, uid, mail, function(err, response){
    res.json({error: err, message: response});
  });
}

/*
Modify contracts
*/
function modifyContract(req, res){
  var id = req.params.id;
  var data = req.body;
  var uid = mongoose.Types.ObjectId(req.body.decoded_token.uid);
  var mail = req.body.decoded_token.sub;
  ctHelper.removing(id, uid, mail, function(err, response){
    if(err){
      res.json({error: err, message: response});
    } else {
      ctHelper.creating(data, uid, mail, function(err, response){
        res.json({error: err, message: response});
      });
    }
  });
}

/*
Delete contracts
*/
function removeContract(req, res){
  var id = req.params.id;
  var uid = mongoose.Types.ObjectId(req.body.decoded_token.uid);
  var mail = req.body.decoded_token.sub;
  ctHelper.removing(id, uid, mail, function(err, response){
    res.json({error: err, message: response});
  });
}

/*
Disable one item
*/
function disableOneItem(req, res){
  var oid = req.body.oid;
  var ct = req.body.ct;
  var uid = req.body.uid;
  var cts = [];
  cts.push(ct);
  ctHelper.pauseContracts(oid, cts, uid)
  .then(function(response){
    res.json({error: false, message: response});
  })
  .catch(function(err){
    logger.debug(err);
    res.json({error: true, message: err});
  });
}

/*
Enable one item
*/
function enableOneItem(req, res){
  var oid = req.body.oid;
  var ct = req.body.ct;
  var uid = req.body.uid;
  ctHelper.enableOneItem(oid, ct, uid)
  .then(function(response){
    res.json({error: false, message: response});
  })
  .catch(function(err){
    logger.debug(err);
    res.json({error: true, message: err});
  });
}

/*
Enable one item
*/
function removeOneItem(req, res){
  var oid = req.body.oid;
  var ct = req.body.ct;
  var uid = req.body.uid;
  ctHelper.removeOneItem(oid, ct, uid)
  .then(function(response){
    res.json({error: false, message: response});
  })
  .catch(function(err){
    logger.debug(err);
    res.json({error: true, message: err});
  });
}

/*
Get contract
*/
function fetchContract(req, res){
  var id = req.params.id; // User id
  var parsedData = {};
  userOp.findOne({ _id: id}, {hasContracts:1}).populate('hasContracts.id')
  .then(function(response){
    res.json({error: false, message: response});
  })
  .catch(function(error){
    res.json({error: true, message: error});
  });
}

// Private Functions

function getOnlyId(array, toAdd){
  for(var i = 0; i < toAdd.length; i++){
    array.push(toAdd[i].id);
  }
}

// Export modules

module.exports.fetchContract = fetchContract;
module.exports.removeContract = removeContract;
module.exports.createContract = createContract;
module.exports.acceptContract = acceptContract;
module.exports.modifyContract = modifyContract;
module.exports.disableOneItem = disableOneItem;
module.exports.enableOneItem = enableOneItem;
module.exports.removeOneItem = removeOneItem;
