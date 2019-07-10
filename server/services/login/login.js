var mongoose = require('mongoose');
var userOp = require('../../models/vicinityManager').user;
var rememberOp = require('../../models/vicinityManager').remember;
var userAccountsOp = require('../../models/vicinityManager').userAccount;
var tokenOp = require('../../models/vicinityManager').token;
var config = require('../../configuration/configuration');
var jwt = require('../../services/jwtHelper');
var mailing = require('../../services/mail/mailing');
var logger = require("../../middlewares/logBuilder");
var bcrypt = require('bcrypt');
var audits = require('../../services/audit/audit');
var crypto = require('crypto');

/*
Check user and password
*/
function authenticate(req, res, callback) {
  var userName = req.body.username;
  var userRegex = new RegExp("^" + userName.toLowerCase(), "i");
  var pwd = req.body.password;
  var myUser = {};
  var hash = "";
  var o_id = "";

  if(userName && pwd){
    userOp.find({ email: { $regex: userRegex } }, {_id:1, email:1, authentication:1})
    .then(function(response){
      if(!response || response.length === 0){
        res.status(404);
        logger.log(req, res, {type: 'warn', data: "User not found: " + userRegex});
        callback(false, "User not found: " + userRegex);
      } else if(response.length > 1){
        res.status(403);
        callback(false, "Duplicated mail: " + userRegex);
      } else if(!response[0].authentication.hash){
        res.status(404);
        callback(false, "User deleted: " + userRegex);
      } else {
        myUser = response[0];
        hash = myUser.authentication.hash;
        bcrypt.compare(pwd, hash)
        .then(function(response){
          if ((userName.toLowerCase() === myUser.email.toLowerCase()) && response){
            o_id = mongoose.Types.ObjectId(myUser._id);
            userAccountsOp.find({ accountOf: {$elemMatch: { id: o_id }}}, {_id:1, cid:1}, function(err, response){
              var credentials = jwt.jwtEncode(myUser._id, userName, myUser.authentication.principalRoles, response[0]._id, response[0].cid);
              logger.log(req, res, {type: 'audit', data: {user: userName, action: 'login'}});
              callback(false, credentials, {uid: myUser._id, cid: response[0]._id});
            });
          } else {
            res.status(401);
            logger.log(req, res, {type: 'warn', data: {user: userName, action: 'login', message: 'Wrong password'}});
            callback(false, {user: userName, action: 'login', message: 'Wrong password'});
          }
        })
        .catch(function(err){
          res.status(500);
          logger.log(req, res, {type: 'error', data: err});
          callback(true, err);
        });
      }
    })
    .catch(function(err){
      res.status(500);
      logger.log(req, res, {type: 'error', data: err});
      callback(true, err);
    });
   } else {
     res.status(400);
     logger.log(req, res, {type: 'warn', data: {user: userName, action: 'login', message: 'Missing fields'}});
     callback(false, {user: userName, action: 'login', message: 'Missing fields'});
  }
}

/*
Refreshes the token after the update of the roles
*/
function refreshToken(req, res, callback){
  try{
    var token = req.body.decoded_token;
    var roles = req.body.roles;
    var credentials = jwt.jwtEncode(token.uid, token.sub, roles, token.orgid, token.cid);
    callback(false, credentials, {uid: token.uid, cid: token.orgid});
  } catch(err) {
    callback(true, err);
  }
}

/*
Stores cookie in MONGO for the Remember Me functionality
*/
function rememberCookie(token, callback) {
  var db = new rememberOp();
  db.token = token;
  db.save(function(err,data){
    if(err){
      callback(true, err);
    }else{
      callback(false, data);
    }
  });
}

/*
Recover password - Sends link to the provided mail
The link provided redirects to updatePwd function in this same module
*/
function findMail(userName, callback){
  var userNameRegex = new RegExp("^" + userName.toLowerCase(), "i");
  var userData;
  userOp.findOne({ email:  { $regex: userNameRegex } }, {contactMail:1, email:1, name:1})
  .then(function(response){
    if(!response) callback(true, {data: "Username not found", type: "warn"});
    userData = response;
    return createUniqueId(userData._id);
  })
  .then(function(uniqueId){
    var mailInfo = {
      link : config.baseHref + "/#/authentication/recoverPassword/" + uniqueId,
      emailTo : userData.contactMail || userData.email,
      subject : 'Password recovery email VICINITY',
      tmpName :'recoverPwd',
      name : userData.name
    };
    return mailing.sendMail(mailInfo);
  })
  .then(function(response){
    callback(false, response);
  })
  .catch(function(err){
    callback(true, err);
  });
}

/*
Updates user password/hash
Mail requests
*/
function updatePwd(id, pwd, callback) {
  var o_id;
  if(pwd === null || pwd.length < 8){
     callback(true, "Missing or short password");
  } else {
    // id comes encoded for uri, we need to decode to find a match
    tokenOp.findOne({token: decodeURIComponent(id)})
    .then(function(response){
      return checkTokenValidity(response);
    })
    .then(function(response){
      o_id = response;
      return updatePwdProcess(o_id, pwd);
    })
    .then(function(response){
      callback(false, {message: 'Password updated', user: o_id });
    })
    .catch(function(err){
      callback(true, err);
    });
  }
}

/*
Updates user password/hash
UI requests
*/
function updatePwdUI(id, pwd, callback) {
  var o_id = mongoose.Types.ObjectId(id);
  if(pwd === null || pwd.length < 8){
     callback(true, "Missing or short password");
  } else {
    // id comes encoded for uri, we need to decode to find a match
    updatePwdProcess(o_id, pwd)
    .then(function(response){
      callback(false, {message: 'Password updated', user: o_id });
    })
    .catch(function(err){
      callback(true, err);
    });
  }
}

/*
Updates rememberMe cookie in browser
*/
function updateCookie(o_id_cookie, token, updates, callback) {
  var decoded = jwt.jwtDecode(token);
  var o_id_user = mongoose.Types.ObjectId(decoded.uid);
  userOp.findById(o_id_user, function(err, dataUser){  // Load roles from user collection because they may change during a session
    var newToken = jwt.jwtEncode(decoded.uid, dataUser.email, dataUser.authentication.principalRoles, decoded.orgid, decoded.cid);
    updates.token = newToken.token;
    rememberOp.findByIdAndUpdate(o_id_cookie, {$set: updates}, { new: true }, function(err, data){
      if(!err){
        callback(false, data);
      } else {
        callback(true, err);
      }
    });
  });
}

// -----------------
// Private functions
// -----------------

// Update password process
function updatePwdProcess(o_id, pwd){
  var saltRounds = 10;
  var salt = "";
  var hash = "";
  return bcrypt.genSalt(saltRounds)
  .then(function(response){
    salt = response.toString('hex');
    return bcrypt.hash(pwd, salt);
  })
  .then(function(response){
    // Store hash in your password DB.
    hash = response;
    var updates = {'authentication.hash': hash}; // Stores salt & hash in the hash field
    return userOp.update({ "_id": o_id}, {$set: updates});
  })
  .then(function(response){
    return userOp.findOne({ "_id": o_id}, {cid: 1, email:1});
  })
  .then(function(response){
    return audits.create(
      { kind: 'user', item: response._id , extid: response.email },
      { kind: 'userAccount', item: response.cid.id, extid: response.cid.extid },
      { kind: 'user', item: response._id, extid: response.email },
      16, null);
  });
}


// Stores token to validate password recovery
// Returns token enconded as URI
function createUniqueId(id){
  return new Promise(function(resolve, reject) {
    var token = crypto.randomBytes(32).toString('base64');
    // Remove special characters
    // token = token.replace(/[^a-zA-Z0-9]/g, "0")
    // Store token in db
    var db = new tokenOp({token: token, user: id});
    db.save(function(err, res){
      if(err) reject("Token not saved!!");
      resolve(encodeURIComponent(res.token));
    })
  });
}

// Checks expiration and if token was used
// returns id of the user requesting the new pwd
function checkTokenValidity(obj){
  return new Promise(function(resolve, reject) {
    if(!obj) reject("Password recovery token not found");
    if(obj.used) reject("Link has already been used");
    if(compareDate(obj.date)) reject("Link has expired");
    obj.used = true;
    obj.save(function(err, data){
      if(err) reject(err);
      resolve(data.user);
    });
  });
}

// If more than 2h have past, token is expired and returns true
function compareDate(d){
  var created = new Date(d);
  var now = new Date();
  var diffHours = Math.abs(now.getTime() - created.getTime()) / (1000 * 60 * 60);
  return (diffHours > 2);
}

// Export functions

module.exports.authenticate = authenticate;
module.exports.refreshToken = refreshToken;
module.exports.findMail = findMail;
module.exports.rememberCookie = rememberCookie;
module.exports.updatePwd = updatePwd;
module.exports.updatePwdUI = updatePwdUI;
module.exports.updateCookie = updateCookie;
