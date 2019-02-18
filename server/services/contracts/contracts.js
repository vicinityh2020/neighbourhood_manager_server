/*
 * Global objects and variables
 */

var mongoose = require('mongoose');
var pckContracts = require('sharq-contracts');

var _db = {};
_db.contractOp = require('../../models/vicinityManager').contract;
_db.userOp = require('../../models/vicinityManager').user;
_db.itemOp = require('../../models/vicinityManager').item;
_db.userAccountOp = require('../../models/vicinityManager').userAccount;

var _funcs = {};
_funcs.logger = require("../../middlewares/logBuilder");
_funcs.audits = require('../../services/audit/audit');
_funcs.notifHelper = require('../../services/notifications/notificationsHelper');
_funcs.commServer = require('../../services/commServer/request');
_funcs.semanticRepo = require('../../services/semanticRepo/request');
_funcs.sync = require('../../services/asyncHandler/sync');

//Functions

/**
Create a contract request
* @return {Callback}
*/
function creating(req, res, callback) {
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
      return Promise.resolve(response);
    })
    .catch(function(err) {
      return Promise.reject(err);
    });
}


/**
 * Contract feeds
 * @param {String} uid
 *
 * @return {Array} Contract requests
 */
function contractFeeds(uid, callback) {
  pckContracts.contractFeeds(uid, _db)
    .then(function(response) {
      callback(false, response);
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
  var obj = {};
  obj.ctid = req.params.ctid;
  obj.uid = req.body.decoded_token.uid;
  obj.query = checkInput(obj.ctid, false);
  pckContracts.contractInfo(obj, req, res, _db, _funcs)
    .then(function(response) {
      callback(false, response);
    })
    .catch(function(err) {
      callback(true, err);
    });
}

/*
Get user contracts
*/
function fetchContract(req, res) {
  pckContracts.fetchContract(req, res, _db, _funcs)
    .then(function(response) {
      return Promise.resolve(response);
    })
    .catch(function(error) {
      return Promise.reject(error);
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
  pckContracts.pauseContracts(ctData, req, res, _db, _funcs)
    .then(function(response) {
      return Promise.resolve(response);
    })
    .catch(function(error) {
      return Promise.reject(error);
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
  pckContracts.enableOneItem(req, res, _db, _funcs)
    .then(function(response) {
      return Promise.resolve(response);
    })
    .catch(function(error) {
      return Promise.reject(error);
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
  pckContracts.removeOneItem(req, res, _db, _funcs)
    .then(function(response) {
      return Promise.resolve(response);
    })
    .catch(function(error) {
      return Promise.reject(error);
    });
}

/*
Restart contract, when a service gets updated
1 - Remove contract
2 - Create contract with same specs
3 - Create notifications and logs
*/
function resetContract(cts, uid) {
  pckContracts.resetContract(cts, uid, _db, _funcs)
    .then(function(response) {
      return Promise.resolve(response);
    })
    .catch(function(error) {
      return Promise.reject(error);
    });
}



/**
 * Manages contracts in semanticRepo
 * @params{ ctid action(create, delete) }
 * @return Object{result}
 */
function mgmtSemanticRepo(id, action) {
  pckContracts.mgmtSemanticRepo(id, action, _db, _funcs)
    .then(function(response) {
      return Promise.resolve(response);
    })
    .catch(function(err) {
      return Promise.reject(err);
    });
}

/**
 * Checks uniqueness of the contract to be created
 * Resolves true if contract would be unique
 * @return {Promise}
 */
function isUnique(req, res, callback) {
  pckContracts.isUnique(req, res, _db, _funcs)
    .then(function(response) {
      callback(false, response);
    })
    .catch(function(err) {
      callback(true, err);
    });
}


/*
Check post contract validity
*/
function postCheck(data, roles, cid, callback) {
  pckContracts.postCheck(data, roles, cid, _db, _funcs, function(err, response, success){
    callback(err, response, success);
  });
}

/*
Check delete contract validity
*/
function deleteCheck(ctid, uid, cid, callback) {
  var query = checkInput(ctid, true);
  query._id = uid;
  pckContracts.deleteCheck(query, _db, _funcs, function(err, response, success){
    callback(err, response, success);
  });
}

/*
Check accept contract validity
Check that I am a contracting party and the contract awaits my approval
*/
function acceptCheck(ctid, uid, cid, callback) {
  var query = checkInput(ctid, true);
  query._id = uid;
  pckContracts.acceptCheck(query, _db, _funcs, function(err, response, success){
    callback(err, response, success);
  });
}

/*
Checks if a user can be pulled from a contract
Is the case of user is no contract admin and has no items in it
*/
function checkContracts(userId, userMail) {
  pckContracts.checkContracts(userId, userMail, _db, _funcs)
    .then(function(response) {
      return Promise.resolve(response);
    })
    .catch(function(err) {
      return Promise.reject(err);
    });
}

/*
Checks if a contract has to be removed
Case one party has no items in it
*/
function contractValidity(ctids, uid, mail) {
  pckContracts.contractValidity(ctids, uid, mail, _db, _funcs)
    .then(function(response) {
      return Promise.resolve(response);
    })
    .catch(function(err) {
      return Promise.reject(err);
    });
}

// Private Functions -------------------------------------------------

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

// modules exports ---------------------------

module.exports.creating = creating;
module.exports.accepting = accepting;
module.exports.removing = removing;
module.exports.removeAllContract = removeAllContract;
module.exports.contractFeeds = contractFeeds;
module.exports.contractInfo = contractInfo;
module.exports.fetchContract = fetchContract;
module.exports.pauseContracts = pauseContracts;
module.exports.enableOneItem = enableOneItem;
module.exports.resetContract = resetContract;
module.exports.removeOneItem = removeOneItem;
module.exports.mgmtSemanticRepo = mgmtSemanticRepo; // ???  Call remove one item
module.exports.isUnique = isUnique;
module.exports.postCheck = postCheck;
module.exports.deleteCheck = deleteCheck;
module.exports.acceptCheck = acceptCheck;
module.exports.checkContracts = checkContracts;
module.exports.contractValidity = contractValidity;
