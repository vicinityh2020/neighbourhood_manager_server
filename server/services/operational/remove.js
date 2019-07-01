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
