var mongoose = require('mongoose');
var userOp = require('../../models/vicinityManager').user;
var rememberOp = require('../../models/vicinityManager').remember;
var userAccountsOp = require('../../models/vicinityManager').userAccount;
var config = require('../../configuration/configuration');
var jwt = require('../../services/jwtHelper');
var mailing = require('../../services/mail/mailing');
var logger = require("../../middlewares/logBuilder");
var bcrypt = require('bcrypt');

/*
Check user and password
*/
function authenticate(userName, userRegex, pwd, req, res, callback) {
  var myUser = {};
  var hash = "";
  var o_id = "";

  if(userName && pwd){
    userOp.find({ email: { $regex: userRegex } }, {_id:1, email:1, authentication:1})
    .then(function(response){
      if(!response || response.length === 0){
        logger.log(req, res, {type: 'warn', data: "User not found: " + userRegex});
        callback(false, "User not found: " + userRegex);
      } else if(response.length > 1){
        callback(true, "Duplicated mail: " + userRegex);
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
              callback(false, credentials);
            });
          } else {
            logger.log(req, res, {type: 'warn', data: {user: userName, action: 'login', message: 'Wrong password'}});
            callback(false, {user: userName, action: 'login', message: 'Wrong password'});
          }
        })
        .catch(function(err){
          callback(true, err);
        });
      }
    })
    .catch(function(err){
      callback(true, err);
    });
   } else {
     logger.log(req, res, {type: 'warn', data: {user: userName, action: 'login', message: 'Missing fields'}});
     callback(false, {user: userName, action: 'login', message: 'Missing fields'});
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
  userOp.findOne({ email:  { $regex: userNameRegex } }, {contactMail:1, email:1, name:1})
  .then(function(result){
    if(!result) return false;
    var mailInfo = {
      link : config.baseHref + "/#/authentication/recoverPassword/" + result._id,
      emailTo : result.contactMail || result.email,
      subject : 'Password recovery email VICINITY',
      tmpName :'recoverPwd',
      name : result.name
    };
    return mailing.sendMail(mailInfo);
  })
  .then(function(response){
    if(!response) callback(true, {data: "Username not found", type: "warn"});
    callback(false, response);
  })
  .catch(function(err){
    callback(true, err);
  });
}

/*
Updates user password/hash
*/
function updatePwd(id, pwd, callback) {
  var o_id = mongoose.Types.ObjectId(id);
  var saltRounds = 10;
  var salt = "";
  var hash = "";

  bcrypt.genSalt(saltRounds)
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
    callback(false, response);
  })
  .catch(function(err){
    callback(true, err);
  });
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

// Export functions

module.exports.authenticate = authenticate;
module.exports.findMail = findMail;
module.exports.rememberCookie = rememberCookie;
module.exports.updatePwd = updatePwd;
module.exports.updateCookie = updateCookie;
