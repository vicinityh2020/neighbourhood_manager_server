// Global objects

var mongoose = require('mongoose');
var nodeOp = require('../../models/vicinityManager').node;
var keyOp = require('../../models/vicinityManager').gatewayKey;
var logger = require("../../middlewares/logBuilder");

// Find a key
function find(req, res, next) {
  var agid = req.params.id;
  keyOp.find({agid: agid}).select({key: 1, _id: -1})
  .then(function(data){
    res.json({error: false, key: data[0].key});
  })
  .catch(function(error){
    res.json({error: true, message: error});
  });
}

// Insert new key or update old one
function upsert(req, res, next) {
  var agid = req.params.id;
  var key = req.body.key;
  keyOp.update({agid: agid}, {$set: {key: key}}, {upsert: true})
  .then(function(response){
    return nodeOp.update({adid: agid}, {$set: {hasKey: true}});
  })
  .then(function(response){
    res.json({error: false, success: true});
  })
  .catch(function(error){
    res.json({error: true, message: error});
  });
}

// Remove a key
function remove(req, res, next) {
  var agid = req.params.id;
  keyOp.remove({agid: agid})
  .then(function(response){
    return nodeOp.update({adid: agid}, {$set: {hasKey: false}});
  })
  .then(function(response){
    res.json({error: false, success: true});
  })
  .catch(function(error){
    res.json({error: true, message: error});
  });
}

// Exports Functions

module.exports.find = find;
module.exports.upsert = upsert;
module.exports.remove = remove;
