// Global objects and variables

var mongoose = require('mongoose');
var contractOp = require('../../models/vicinityManager').contract;
var userOp = require('../../models/vicinityManager').user;
var itemOp = require('../../models/vicinityManager').item;
var commServer = require('../../services/commServer/request');
var sync = require('../../services/asyncHandler/sync');

//Functions

/**
 * Remove whole contract
 * @params {Array} of objects containing extid
 * [{extid:.., }, {extid:..., }];
 * @returns {Promise}
 */

function removeContracts(payload) {

  var ids = [];
  getOnlyProp(ids, payload, ['extid']);
  return new Promise(function(resolve, reject) {
    if (ids.length > 0) { // Check if there is any item to delete
      sync.forEachAll(ids,
        function(value, allresult, next) {
          var users = [];
          var items = [];
          var data = {};
          var ctid = {};
          contractOp.findOne({
              ctid: value
            })
            .then(function(response) {
              var query = {
                foreignIot: {},
                iotOwner: {},
                legalDescription: "",
                status: "deleted"
              };
              data = response.toObject(); // Get rid of metadata
              return contractOp.update({
                ctid: value
              }, {
                $set: query
              });
            })
            .then(function(response) {
              return cancelContract(data.ctid);
            })
            .then(function(response) {
              ctid = {
                id: data._id,
                extid: data.ctid
              };
              getOnlyProp(users, data.foreignIot.uid, ['id']);
              getOnlyProp(items, data.foreignIot.items, ['id']);
              getOnlyProp(users, data.iotOwner.uid, ['id']);
              getOnlyProp(items, data.iotOwner.items, ['id']);
              return userOp.update({
                _id: {
                  $in: users
                }
              }, {
                $pull: {
                  hasContracts: ctid
                }
              }, {
                multi: true
              });
            })
            .then(function(response) {
              return itemOp.update({
                _id: {
                  $in: items
                }
              }, {
                $pull: {
                  hasContracts: ctid
                }
              }, {
                multi: true
              });
            })
            .then(function(response) {
              allresult.push({
                id: value,
                message: 'success'
              });
              next();
            })
            .catch(function(err) {
              allresult.push({
                id: value,
                message: err
              });
              next();
            });
        },
        function(allresult) {
          if (allresult.length === ids.length) {
            resolve({
              error: false,
              message: allresult
            });
          }
        },
        false, {}
      );
    } else {
      resolve({
        message: "Nothing to be removed..."
      });
    }
  });
}


/**
 * Remove whole organisation
 * @params {Object} Object containing extid and id
 * {extid:.., id:... }
 * @returns {Promise}
 */
function removeOrganisation(payload){
  try{
    if(req.body.decoded_token){
      req.body.decoded_token.sub = req.body.decoded_token.sub || null;
      req.body.decoded_token.uid = req.body.decoded_token.uid || null;
    } else {
      req.body = {};
      req.body.decoded_token = {sub : null, uid: null};
    }
    var cid = mongoose.Types.ObjectId(req.body.decoded_token.orgid);
    var uid = mongoose.Types.ObjectId(req.body.decoded_token.uid);
    var semantic_extid = req.body.decoded_token.cid;
    var mail = req.body.decoded_token.sub;

    // Start final result info object
    var deletingResults = {};
    deletingResults.info = { action: "Organisation deleted", actor: mail};

    companyAccountOp.findOne({ _id: cid },
      function(err, companyData){
        if (err) {
          callback(true, err);
        } else {
          var companyDataParsed = companyData.toObject();
          var friends = [];
          var users = [];
          var nodes = [];
          getOids(companyDataParsed.knows, friends, 'id');
          getOids(companyDataParsed.accountOf, users, 'id');
          getOids(companyDataParsed.hasNodes, nodes, 'extid');

          DeleteAllContracts(users, uid, mail)
          .then(function(response){
            deletingResults.contracts = response;
            // Remove cid from friends knows arrays
            return companyAccountOp.update({"_id": {$in: friends}}, {$pull: {knows: {id: cid} }}, {multi: true});
          })
          .then(function(response){
              // When deleting a node all items under
            return myNode.deleteNode(nodes, req, res);
          })
          .then(function(response){
            deletingResults.nodes = response;
            // Users are the last thing to be removeFriend
            // To remove a user it cannot have any item or contract under
            return delUser.deleteAllUsers(users, req, res);
          })
          .then(function(response){
            deletingResults.users = response;
            // Remove organisation
            companyData.location = "";
            companyData.name = companyDataParsed.name + ":" + uuid();
            companyData.hasNotifications = [];
            companyData.hasNodes = [];
            companyData.knows = [];
            companyData.hasAudits = [];
            companyData.knowsRequestsTo = [];
            companyData.knowsRequestsFrom = [];
            companyData.avatar = "";
            companyData.status = "deleted";
            return companyData.save();
          })
          .then(function(response){
            deletingResults.organisation = {cid: cid, result: 'Success'};
            if(process.env.env !== 'test'){
              return semanticRepo.callSemanticRepo([semantic_extid], "agents/delete", "POST");
            } else {
              return Promise.resolve(false);
            }
          })
          .then(function(response){
            callback(false, deletingResults);
          })
          .catch(function(err){
            callback(true, err);
          });
        }
      });
    } catch(err) {
      callback(true, err);
    }
}

// Private functions

// Extract unique company contracts and remove them
function DeleteAllContracts(users, uid, mail){
  var contracts = [];
  var uniqueContracts = [];
  return new Promise(function(resolve, reject) {
    userOp.find({"_id": {$in: users}}, {hasContracts: 1})
    .then(function(response){
      for(var i = 0, l = response.length; i < l; i++){
        for(var j = 0, k = response[i].hasContracts.length; j < k; j++){
          contracts.push(response[i].hasContracts[j].extid);
        }
      }
      getUnique(uniqueContracts, contracts);
      var contractsToDel = [];
      for(var ii = 0, ll = uniqueContracts.length; ii < ll; ii ++){
        contractsToDel.push(sContracts.removeAllContract(uniqueContracts[ii], uid, mail));
      }
      return Promise.all(contractsToDel);
    })
    .then(function(response){
      resolve(uniqueContracts);
    })
    .catch(function(err){
      reject(err);
    });
  });
}

/*
Remove contract group in commServer
*/
function cancelContract(id) {
  return commServer.callCommServer({}, 'groups/' + id, 'DELETE')
    .catch(function(err) {
      return new Promise(function(resolve, reject) {
        if (err.statusCode !== 404) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
}

/*
Extract one field per object in array
Output: array of strings
*/
function getOnlyProp(items, toAdd, properties) {
  var aux;
  for (var i = 0, l = toAdd.length; i < l; i++) {
    aux = toAdd[i];
    for (var j = 0, k = properties.length; j < k; j++) {
      aux = aux[properties[j]];
    }
    items.push(aux);
  }
}

// modules exports ---------------------------

module.exports.removeContracts = removeContracts;
module.exports.removeOrganisation = removeOrganisation;
