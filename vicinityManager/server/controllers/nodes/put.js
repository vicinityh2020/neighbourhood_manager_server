
// Global objects

var mongoose = require('mongoose');
var nodeOp = require('../../models/vicinityManager').node;
var userAccountOp = require('../../models/vicinityManager').userAccount;
var logger = require("../../middlewares/logBuilder");
var myNode = require('../../services/nodes/processNode');

// Function

  /*
  Updates a node for an organisation
  Adds or deletes a node depending on the status field of the node MONGO object
  Receives request from client
  */
  function putOne(req, res) {
    var adid = req.params.id;
    var updates = req.body;
    var userMail = req.body.decoded_token !== 'undefined' ? req.body.decoded_token.sub : "unknown";
    var userId = req.body.decoded_token !== 'undefined' ? req.body.decoded_token.uid : "unknown";

    delete updates.userMail;

    nodeOp.findOneAndUpdate({adid: adid}, {$set: updates}, { new: true }, function(err, data){
      if(err){
          logger.log(req, res, {data: err, type: "error"});
      }else{
        var cid = data.cid.id;
        if(req.body.status === 'deleted'){
          var adids = [];
          adids.push(adid);
          userAccountOp.update({_id: cid}, { $pull: {hasNodes: {extid: adid}} })
          .then(function(response){
            // Accepts bulk remove of several nodes
            return myNode.deleteNode(adids, userMail, userId);
          })
          .then(function(response){
            logger.log(req, res, {data: response, type: "audit"});
            res.json({'error': false, 'message': response});})
          .catch(function(err){
            logger.log(req, res, {data: err, type: "debug"});
            res.json({'error': true, 'message': err});});
        }else{
          data.pass = req.body.pass;
          // Can only update one node per call
          myNode.updateNode(data, userMail, userId)
          .then(function(response){
            logger.log(req, res, {type: "audit", data: {user: userMail, action: 'updateNode', item: data.adid }});
            res.json({'error': false, 'message': response.data});
          })
          .catch(function(err){
            logger.log(req, res, {data: err, type: "error"});
            res.json({'error': true, 'message': err});});
        }
      }
    });
  }

// Export Functions

module.exports.putOne = putOne;
