/*
* Global objects and variables
*/

var mongoose = require('mongoose');
var uuid = require('uuid/v4'); // Unique ID RFC4122 generator
var pckContracts = require('sharq-contracts');
var ctChecks = require('./contractChecks.js');

var contractOp = require('../../models/vicinityManager').contract;
var userOp = require('../../models/vicinityManager').user;
var itemOp = require('../../models/vicinityManager').item;

var logger = require("../../middlewares/logBuilder");
var audits = require('../../services/audit/audit');
var notifHelper = require('../../services/notifications/notificationsHelper');
var commServer = require('../../services/commServer/request');
var semanticRepo = require('../../services/semanticRepo/request');
var sync = require('../../services/asyncHandler/sync');

var _db = {};
_db.userOp = userOp;
_db.itemOp = itemOp;
_db.contractOp = contractOp;

var _funcs = {};
_funcs.commServer = commServer;
_funcs.notifHelper = notifHelper;
_funcs.audits = audits;
_funcs.sync = sync;
_funcs.logger = logger;
_funcs.semanticRepo = semanticRepo;

//Functions

/**
Create a contract request
* @return {Callback}
*/
function creating(req, res, callback){
  pckContracts.create(req, res, _db, _funcs)
  .then(function(response) {
    callback(false, 'Contract posted, waiting for approval');
  })
  .catch(function(error) {
    callback(true, error);
  });
}

/**
Accept a contract request
Input id (MONGO) or CTID, both supported
* @return {Callback} With updItem
*/
function accepting(req, res, callback) {
  var id = req.params.id; // Contract id to be accepted
  var obj = {};
  // Build queries (accept id or ctid)
  obj.queryId = checkInput(id, false);
  obj.queryContract = checkInput(id, true);
  obj.id = id;

  pckContracts.accept(obj, req, res, _db, _funcs)
  .then(function(response) {
    callback(false, response);
  })
  .catch(function(error) {
    callback(true, error);
  });
}

/**
Remove a contract
* @return {Callback}
*/
function removing(req, res, callback) {
  var id = req.params.id; // Contract id to be accepted
  var obj = {};
  // Build queries (accept id or ctid)
  obj.queryId = checkInput(id, false);
  obj.queryContract = checkInput(id, true);
  obj.id = id;
  pckContracts.cancel(obj, req, res, _db, _funcs)
  .then(function(response) {
    callback(false, response);
  })
  .catch(function(error) {
    callback(true, error);
  });
}

/**
Remove whole contract
* @return {Promise}
*/
function removeAllContract(id, token_uid, token_mail) {
  obj.queryId = checkInput(id, false);
  obj.token_uid = token_uid;
  obj.token_mail = token_uid;
  pckContracts.removeAllContract(obj, _db, _funcs)
  .then(function(response) {
    resolve(response);
  })
  .catch(function(err) {
    reject(err);
  });
}


/**
 * Contract feeds
 * @param {String} uid
 *
 * @return {Array} Contract requests
 */
function contractFeeds(uid, callback) {
  userOp.findOne({
      _id: uid
    }, {
      hasContracts: 1
    })
    .then(function(response) {
      var openContracts = [];
      for (var i = 0; i < response.hasContracts.length; i++) {
        if (!response.hasContracts[i].approved || response.hasContracts[i].inactive.length > 0) {
          openContracts.push(response.hasContracts[i]);
        }
      }
      openContracts = openContracts.length > 0 ? openContracts : false;
      callback(false, openContracts);
    })
    .catch(function(err) {
      callback(true, err);
    });
}

/**
 * Contract info - return one contract
 * @param {String} ctid
 * @param {String} uid
 *
 * @return {Object} Contract instance
 */
function contractInfo(req, res, callback) {
  var ctid = req.params.ctid;
  var uid = req.body.decoded_token.uid;
  var query = checkInput(ctid);
  contractOp.findOne(query)
    .then(function(response) {
      var data = response.toObject();
      if (!response) {
        logger.log(req, res, {
          type: 'warn',
          data: "The contract with: " + JSON.stringify(query) + " could not be found"
        });
        callback(false, false);
      } else if (!uidInContract(uid, data)) {
        logger.log(req, res, {
          type: 'warn',
          data: "You are not part of the contract with ctid: " + data.ctid
        });
        res.status(401);
        callback(false, "You are not part of the contract with ctid: " + data.ctid);
      } else {
        callback(false, response);
      }
    })
    .catch(function(err) {
      callback(true, err);
    });
}

/*
When an item is updated we need to put them in "hold" the contracts
1 - Remove from ct comm server groups
2 - Set in item in all contracts approved=false
3 - Add flag in user contract instance with the "inactive" items
4 - Create notifications and logs
*/
function pauseContracts(req, res, ctData) {
  var oid, ct, uid;
  if (ctData && ctData.ct.length > 0) {
    oid = ctData.oid;
    ct = ctData.ct;
    uid = ctData.uid;
  } else {
    oid = req.body.oid;
    ct = req.body.ct;
    uid = req.body.uid;
  }
  var cts = [];
  if (ct.constructor === Array) {
    cts = ct;
  } else {
    cts.push(ct);
  }
  return new Promise(function(resolve, reject) {
    if (cts.length > 0) { // Check if there is any item to delete
      sync.forEachAll(cts,
        function(value, allresult, next, otherParams) {
          // Add inactive items to user contract item
          userOp.update({
              "_id": uid.id,
              "hasContracts.extid": value.extid
            }, {
              $push: {
                "hasContracts.$.inactive": oid.extid
              }
            })
            .then(function(response) {
              deletingOne(otherParams.oid, {
                mail: otherParams.mail,
                ctid: value.extid
              }, req, res, function(value, result) {
                allresult.push({
                  value: oid.extid,
                  result: result
                });
                next();
              });
            })
            .catch(function(error) {
              allresult.push({
                value: value.extid,
                result: err
              });
              next();
            });
        },
        function(allresult) {
          if (allresult.length === cts.length) {
            var ct_oids = [];
            getOnlyProp(ct_oids, cts, ['extid']);
            itemOp.findOne({
                "_id": oid.id
              })
              .then(function(response) {
                // Set to approved false all contracts in an inactive item
                for (var i = 0, l = response.hasContracts.length; i < l; i++) {
                  if (ct_oids.indexOf(response.hasContracts[i].extid) !== -1) {
                    response.hasContracts[i].approved = false;
                  }
                }
                return response.save();
              })
              .then(function(response) {
                // Only set to inactive infrastructure --> Service would reset whole contract
                return contractOp.update({
                  "ctid": {
                    $in: ct_oids
                  },
                  "iotOwner.items.id": oid.id
                }, {
                  $set: {
                    "iotOwner.items.$.inactive": true
                  }
                }, {
                  multi: true
                });
              })
              .then(function(response) {
                var semRepoUpd = [];
                for (var i = 0, l = ct_oids.length; i < l; i++) {
                  semRepoUpd.push(mgmtSemanticRepo(ct_oids[i], "create"));
                }
                return Promise.all(semRepoUpd);
              })
              .then(function(response) {
                var toNotif = [];
                for (var i = 0, l = cts.length; i < l; i++) {
                  toNotif.push(notifHelper.createNotification({
                      kind: 'item',
                      item: oid.id,
                      extid: oid.extid
                    }, {
                      kind: 'user',
                      item: uid.id,
                      extid: uid.extid
                    }, {
                      kind: 'contract',
                      item: cts[i].id,
                      extid: cts[i].extid
                    },
                    'info', 26, null));
                }
                return Promise.all(toNotif);
              })
              .then(function(response) {
                for (var i = 0, l = cts.length; i < l; i++) {
                  audits.create({
                      kind: 'user',
                      item: uid.id,
                      extid: uid.extid
                    }, {}, {
                      kind: 'contract',
                      item: cts[i].id,
                      extid: cts[i].extid
                    },
                    56, "Item " + oid.extid + " disabled");
                }
                return true;
              })
              .then(function(response) {
                logger.log(req, res, {
                  type: 'debug',
                  data: 'Disabling item in contract(s): ' + oid.extid
                });
                resolve({
                  toPause: allresult
                });
              })
              .catch(function(err) {
                reject(err);
              });
          }
        },
        false, {
          oid: oid.extid,
          mail: uid.extid
        }
      );
    } else {
      logger.log(req, res, {
        type: 'warn',
        data: {
          user: uid.extid,
          action: 'removeItemFromContract',
          message: "No items to be removed"
        }
      });
      resolve({
        toPause: "Nothing to be removed..."
      });
    }
  });
}

/*
Reactivate ONE item in ONE contract after update
1 - Add to ct comm server groups
2 - Set ONE item in ONE contract approved=true
3 - Remove item from flags in user contract "inactive" items
4 - Create notifications and logs
*/
function enableOneItem(req, res) {
  var oid = req.body.oid;
  var ct = req.body.ct;
  var uid = req.body.uid;
  return new Promise(function(resolve, reject) {
    var otherData = {
      ctid: ct.extid,
      mail: uid.extid
    };
    addingOne(oid, otherData, req, res, function(err, response) {
      itemOp.update({
          "oid": oid,
          "hasContracts.extid": ct.extid
        }, {
          $set: {
            "hasContracts.$.approved": true
          }
        })
        .then(function(response) {
          return userOp.update({
            "_id": uid.id,
            "hasContracts.extid": ct.extid
          }, {
            $pull: {
              "hasContracts.$.inactive": oid
            }
          });
        })
        .then(function(response) {
          return mgmtSemanticRepo(ct.extid, "create");
        })
        .then(function(response) {
          return audits.create({
              kind: 'user',
              item: uid.id,
              extid: uid.extid
            }, {}, {
              kind: 'contract',
              item: ct.id,
              extid: ct.extid
            },
            56, "Item " + oid + " enabled");
        })
        .then(function(response) {
          logger.log(req, res, {
            type: 'debug',
            data: 'Enabling item from contract(s): ' + oid
          });
          resolve('Success');
        })
        .catch(function(err) {
          reject(err);
        });
    });
    // TODO Notifs
  });
}

/*
Remove ONE item from contract
1 - Remove from ct comm server groups
2 - Pull contract object from item
3 - Pull item from user contract obj inactives (just in case)
4 - Pull item from contract
5 - Create notifications and logs (Deleting one function)
*/
function removeOneItem(req, res) {
  var oid = req.body.oid;
  var ct = req.body.ct;
  var uid = req.body.uid;
  return new Promise(function(resolve, reject) {
    var otherData = {
      ctid: ct.extid,
      mail: uid.extid
    };
    deletingOne(oid, otherData, req, res, function(err, response) {
      itemOp.update({
          "oid": oid
        }, {
          $pull: {
            hasContracts: {
              extid: ct.extid
            }
          }
        })
        .then(function(response) {
          return userOp.update({
            "_id": uid.id,
            "hasContracts.extid": ct.extid
          }, {
            $pull: {
              "hasContracts.$.inactive": oid
            }
          });
        })
        .then(function(response) {
          return contractOp.update({
            "ctid": ct.extid
          }, {
            $pull: {
              "foreignIot.items": {
                extid: oid
              }
            }
          });
        })
        .then(function(response) {
          return contractOp.update({
            "ctid": ct.extid
          }, {
            $pull: {
              "iotOwner.items": {
                extid: oid
              }
            }
          });
        })
        .then(function(response) {
          return ctChecks.contractValidity([ct.extid], uid.id, uid.extid);
        })
        .then(function(response) {
          return mgmtSemanticRepo(ct.extid, "create");
        })
        .then(function(response) {
          return audits.create({
              kind: 'user',
              item: uid.id,
              extid: uid.extid
            }, {}, {
              kind: 'contract',
              item: ct.id,
              extid: ct.extid
            },
            56, "Item " + oid + " removed");
        })
        .then(function(response) {
          logger.log(req, res, {
            type: 'debug',
            data: 'Delete item from contract(s): ' + oid
          });
          resolve('Success');
        })
        .catch(function(err) {
          reject(err);
        });
    });
    // TODO Notifs
  });
}

/*
Restart contract, when a service gets updated
1 - Remove contract
2 - Create contract with same specs
3 - Create notifications and logs
*/
function resetContract(cts, uid) {
  return new Promise(function(resolve, reject) {
    if (cts.length > 0) { // Check if there is any item to delete
      sync.forEachAll(cts,
        function(value, allresult, next, otherParams) {
          var contractData = {};
          var uidService = [];
          var idsService = [];
          var uidDevice = [];
          var idsDevice = [];
          var items = [];
          var users = [];
          contractOp.findOne({
              ctid: value.extid
            })
            .then(function(response) {
              // Set item has contract inactive to true
              for (var i = 0, l = response.iotOwner.items.length; i < l; i++) {
                response.iotOwner.items[i].inactive = true;
              }
              for (var j = 0, k = response.foreignIot.items.length; j < k; j++) {
                response.foreignIot.items[j].inactive = true;
              }
              // Gather contract data
              try {
                contractData = response.toObject();
                getOnlyProp(uidService, contractData.foreignIot.uid, ['id']);
                getOnlyProp(idsService, contractData.foreignIot.items, ['id']);
                getOnlyProp(uidDevice, contractData.iotOwner.uid, ['id']);
                getOnlyProp(idsDevice, contractData.iotOwner.items, ['id']);
                users = uidService.concat(uidDevice);
                items = idsService.concat(idsDevice);
              } catch (err) {
                allresult.push({
                  value: value.extid,
                  result: err
                });
                next();
              }
              // Save contract with changes (items inactive = true)
              return response.save();
            })
            .then(function(response) {
              // Remove Contract group in comm server
              return cancelContract(value.extid);
            })
            .then(function(response) {
              // Add contract group in comm server
              return createContract(value.extid, 'Contract: ' + contractData.type);
            })
            .then(function(response) {
              return userOp.update({
                _id: {
                  $in: users
                },
                "hasContracts.extid": contractData.ctid
              }, {
                $set: {
                  "hasContracts.$.approved": false
                }
              }, {
                multi: true
              });
            })
            .then(function(response) {
              return itemOp.update({
                _id: {
                  $in: items
                },
                "hasContracts.extid": contractData.ctid
              }, {
                $set: {
                  "hasContracts.$.approved": false
                }
              }, {
                multi: true
              });
            })
            .then(function(response) {
              query = {
                $set: {
                  "foreignIot.termsAndConditions": false,
                  "iotOwner.termsAndConditions": false
                }
              };
              return contractOp.update({
                "_id": contractData._id
              }, query);
            })
            .then(function(response) {
              return createNotifAndAudit(contractData._id, contractData.ctid, uid.id, uid.extid, contractData.iotOwner.uid, contractData.foreignIot.uid, true, 'UPDATE'); // Accepted = true
            })
            .then(function(response) {
              allresult.push({
                value: value.extid,
                result: 'Success'
              });
              next();
            })
            .catch(function(err) {
              allresult.push({
                value: value.extid,
                result: err
              });
              next();
            });
        },
        function(allresult) {
          if (allresult.length === cts.length) {
            resolve({
              toReset: allresult
            });
          }
        },
        false, {
          uid: uid
        }
      );
    } else {
      // logger.warn({user:uid.extid, action: 'updateContract', message: "No contracts to be updated"});
      resolve({
        toReset: "Nothing to be removed..."
      });
    }
  });
}

/*
Get user contracts
*/
function fetchContract(req, res) {
  var id = mongoose.Types.ObjectId(req.params.id); // User id
  var offset = req.query.offset;
  var limit = req.query.limit;
  var filter = req.query.filter;
  var aggregation = [];
  aggregation.push({
    $match: {
      "_id": id
    }
  });
  aggregation.push({
    $unwind: "$hasContracts"
  });
  if (Number(filter) !== 0) {
    var filterOptions = [{
        $match: {
          "hasContracts.imForeign": true
        }
      },
      {
        $match: {
          "hasContracts.imForeign": false
        }
      },
      // { $match:{ $or:[{"hasContracts.imAdmin": false}, {"hasContracts.imForeign": false}] }},
      {
        $match: {
          $or: [{
            "hasContracts.approved": false
          }, {
            "hasContracts.inactive": {
              $gt: 0
            }
          }]
        }
      }
    ];
    aggregation.push(filterOptions[Number(filter) - 1]);
  }
  aggregation.push({
    $sort: {
      "hasContracts.id": -1
    }
  });
  if (Number(offset) !== 0) aggregation.push({
    $skip: Number(offset)
  });
  aggregation.push({
    $limit: Number(limit)
  });
  aggregation.push({
    $project: {
      "_id": 0,
      "hasContracts": 1
    }
  });
  return userOp.aggregate(aggregation)
    .then(function(response) {
      return contractOp.populate(response, {
        path: "hasContracts.id"
      });
    })
    .then(function(contracts) {
      if (contracts.length === 0) {
        contracts = [];
        logger.log(req, res, {
          type: 'warn',
          data: 'No contracts for: ' + id
        });
        return Promise.resolve(contracts);
      } else {
        return Promise.resolve(contracts);
      }
    })
    .catch(function(error) {
      return Promise.reject(error);
    });
}


// Private Functions -------------------------------------------------

/*
Add or remove items to the contract
*/
function moveItemsInContract(ctid, token_mail, items, add, req, res) {
  if (items.length > 0) { // Check if there is any item to delete
    sync.forEachAll(items,
      function(value, allresult, next, otherParams) {
        if (add) {
          addingOne(value, otherParams, req, res, function(value, result) {
            allresult.push({
              value: value,
              result: result
            });
            next();
          });
        } else {
          deletingOne(value, otherParams, req, res, function(value, result) {
            allresult.push({
              value: value,
              result: result
            });
            next();
          });
        }
      },
      function(allresult) {
        if (allresult.length === items.length) {
          return mgmtSemanticRepo(ctid, "create")
            .then(function(response) {
              return Promise.resolve({
                "error": false,
                "message": allresult
              });
            })
            .catch(function(err) {
              return Promise.resolve({
                "error": true,
                "message": allresult
              });
            });
        }
      },
      false, {
        ctid: ctid,
        mail: token_mail
      }
    );
  } else {
    if (add) {
      logger.log(req, res, {
        type: 'warn',
        data: {
          user: token_mail,
          action: 'addItemToContract',
          message: "No items to be added"
        }
      });
      return Promise.resolve({
        "error": false,
        "message": "Nothing to be added..."
      });
    } else {
      logger.log(req, res, {
        type: 'warn',
        data: {
          user: token_mail,
          action: 'removeItemFromContract',
          message: "No items to be removed"
        }
      });
      return Promise.resolve({
        "error": false,
        "message": "Nothing to be removed..."
      });
    }
  }
}

/*
Add items to contract group in commServer
Extends to moveItemsInContract
*/
function addingOne(oid, otherParams, req, res, callback) {
  itemOp.updateOne({
      "oid": oid,
      "hasContracts.extid": otherParams.ctid
    }, {
      $set: {
        "hasContracts.$.approved": true
      }
    })
    .then(function(response) {
      return contractOp.update({
        "iotOwner.items.extid": oid,
        ctid: otherParams.ctid
      }, {
        $set: {
          "iotOwner.items.$.inactive": false
        }
      });
    })
    .then(function(response) {
      return contractOp.update({
        "foreignIot.items.extid": oid,
        ctid: otherParams.ctid
      }, {
        $set: {
          "foreignIot.items.$.inactive": false
        }
      });
    })
    .then(function(response) {
      return commServer.callCommServer({}, 'users/' + oid + '/groups/' + otherParams.ctid, 'POST');
    })
    .then(function(response) {
      logger.log(req, res, {
        type: "audit",
        data: {
          user: otherParams.mail,
          action: 'addItemToContract',
          item: oid,
          contract: otherParams.ctid
        }
      });
      callback(oid, "Success");
    })
    .catch(function(err) {
      if (err.statusCode !== 404) {
        callback(oid, 'Error: ' + err);
      } else {
        logger.log(req, res, {
          type: "audit",
          data: {
            user: otherParams.mail,
            action: 'addItemToContract',
            item: oid,
            contract: otherParams.ctid
          }
        });
        callback(oid, "Success");
      }
    });
}


/*
Remove items from contract group in commServer
Extends to moveItemsInContract
*/
function deletingOne(oid, otherParams, req, res, callback) {
  commServer.callCommServer({}, 'users/' + oid + '/groups/' + otherParams.ctid, 'DELETE')
    .then(function(response) {
      logger.log(req, res, {
        type: "audit",
        data: {
          user: otherParams.mail,
          action: 'removeItemFromContract',
          item: oid,
          contract: otherParams.ctid
        }
      });
      callback(oid, "Success");
    })
    .catch(function(err) {
      if (err.statusCode !== 404) {
        callback(oid, err);
      } else {
        logger.log(req, res, {
          type: "audit",
          data: {
            user: otherParams.mail,
            action: 'removeItemFromContract',
            item: oid,
            contract: otherParams.ctid
          }
        });
        callback(oid, "Success");
      }
    });
}

/*
Remove contract group in commServer
*/
function cancelContract(id) {
  return commServer.callCommServer({}, 'groups/' + id, 'DELETE')
    .then(function(response) {
      return mgmtSemanticRepo(id, "delete");
    })
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
Start contract group in commServer
*/
function createContract(id, descr) {
  var payload = {
    name: id,
    description: descr
  };
  return commServer.callCommServer(payload, 'groups', 'POST');
}

/*
Create notifications
*/
function createNotifAndAudit(ct_id, ctid, uid, mail, ownUsers, foreignUsers, imAdmin, type) {
  return new Promise(function(resolve, reject) {
    var auditNumber;
    var notifNumber;
    var notifTarget = [];
    var message = null;
    try {
      var allUsers = ownUsers.concat(foreignUsers);
      for (var n = 0; n < allUsers.length; n++) {
        notifTarget.push({
          kind: 'user',
          item: allUsers[n].id,
          extid: allUsers[n].extid
        });
      }

      if (imAdmin && type === "ACCEPT") {
        notifNumber = 22;
        auditNumber = 52;
      } else if (!imAdmin && type === "ACCEPT") {
        notifNumber = 24;
        auditNumber = 54;
      } else if (imAdmin && type === "DELETE") {
        notifNumber = 23;
        auditNumber = 53;
      } else if (!imAdmin && type === "DELETE") {
        notifNumber = 25;
        auditNumber = 55;
      } else if (type === "UPDATE") {
        notifNumber = 26;
        auditNumber = 56;
        message = "Reset contract";
      } else {
        resolve(false);
      }

      // Asynchronously notify all allUsers
      // Ignore response
      var toNotify = [];
      for (var i = 0; i < notifTarget.length; i++) {
        toNotify.push(notifHelper.createNotification({
            kind: 'user',
            item: uid,
            extid: mail
          },
          notifTarget[i], {
            kind: 'contract',
            item: ct_id,
            extid: ctid
          },
          'info', notifNumber, message
        ));
      }
      Promise.all(toNotify)
        .then(function(response) {
          return audits.create({
              kind: 'user',
              item: uid,
              extid: mail
            }, {}, {
              kind: 'contract',
              item: ct_id,
              extid: ctid
            },
            auditNumber, message);
        })
        .then(function(response) {
          resolve(true);
        })
        .catch(function(err) {
          reject(err);
        });
    } catch (err) {
      resolve(true);
    }
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

/*
Extract one field per object in array
Output: array of strings
Note: Specialized for the contract items
*/
function getOnlyPropCt(items, toAdd, properties) {
  for (var i = 0, l = toAdd.length; i < l; i++) {
    if(!toAdd[i].inactive) items.push(toAdd[i].extid);
  }
}

/**
Accepts or mongo id or external id
* @params {ctid} id
* @params {contracts} boolean
*/
function checkInput(ctid, contracts) {
  var query;
  try {
    // if error is external id
    var id = mongoose.Types.ObjectId(ctid);
    if (contracts) {
      query = {
        'hasContracts.id': id
      };
    } else {
      query = {
        _id: id
      };
    }
    return query;
  } catch (err) {
    if (contracts) {
      query = {
        'hasContracts.extid': ctid
      };
    } else {
      query = {
        ctid: ctid
      };
    }
    return query;
  }
}

function checkInput2(ctid) {
  var id;
  try {
    id = mongoose.Types.ObjectId(ctid);
    return {
      'hasContracts.id': id
    };
  } catch (err) {
    return {
      'hasContracts.extid': ctid
    };
  }
}

/**
 * Looks for the user id in the contracts
 * @return {Boolean}
 */
function uidInContract(uid, data) {
  var array = [];
  array = data.iotOwner.uid;
  array = array.concat(data.foreignIot.uid);
  for (var i = 0, l = array.length; i < l; i++) {
    if (uid === array[i].id.toString()) {
      return true;
    }
  }
  return false;
}

/**
 * Manages contracts in semanticRepo
 * @params{ ctid action(create, delete) }
 * @return Object{result}
 */
function mgmtSemanticRepo(id, action) {
  return payloadSemanticRepo(id, action)
    .then(function(response) {
      if(!response){
        return Promise.resolve("Nothing was created in Semantic Repository");
      } else {
        var body = response.body;
        var type = response.action;
        return semanticRepo.callSemanticRepo(body, "contracts/" + type, "POST");
      }
    })
    .then(function(response) {
      return Promise.resolve(response);
    })
    .catch(function(err) {
      return Promise.reject(err);
    });
}

// Get payload for creating/deleting the contract instance in semanticRepo
function payloadSemanticRepo(id, action) {
  var result = {};
  var body;
  if (action === "create") {
    return contractOp.find({
        ctid: id
      }, {
        readWrite: 1,
        foreignIot: 1,
        iotOwner: 1
      })
      .then(function(response) {
        var petitioner_items = [];
        if(response[0].foreignIot.items.length !== 0 && response[0].foreignIot.items[0].inactive) {
          Promise.resolve(false);
        } else {
          getOnlyPropCt(petitioner_items, response[0].iotOwner.items);
          if (petitioner_items.length === 0 || response[0].foreignIot.items.length === 0) {
            result.body = [id];
            result.action = "delete";
            return Promise.resolve(result);
          } else {
            result.body = [{
              contract_id: id,
              write_rights: response[0].readWrite,
              requested_service: response[0].foreignIot.items[0].extid,
              petitioner_items: petitioner_items,
              service_owner: response[0].foreignIot.cid.extid,
              service_petitioner: response[0].iotOwner.cid.extid
            }];
            result.action = "create";
            return Promise.resolve(result);
          }
        }
      })
      .catch(function(err) {
        return Promise.reject(err);
      });
  } else {
    result.body = [id];
    result.action = "delete";
    return Promise.resolve(result);
  }
}

// modules exports ---------------------------

module.exports.creating = creating;
module.exports.accepting = accepting;
module.exports.removing = removing;
module.exports.removeAllContract = removeAllContract;




module.exports.contractFeeds = contractFeeds;
module.exports.contractInfo = contractInfo;
module.exports.pauseContracts = pauseContracts;
module.exports.enableOneItem = enableOneItem;
module.exports.resetContract = resetContract;
module.exports.removeOneItem = removeOneItem;
module.exports.fetchContract = fetchContract;


module.exports.mgmtSemanticRepo = mgmtSemanticRepo; // ???  Call remove one item
module.exports.createNotifAndAudit = createNotifAndAudit;
