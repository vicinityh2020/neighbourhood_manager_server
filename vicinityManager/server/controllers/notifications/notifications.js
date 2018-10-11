
var mongoose = require('mongoose');
var logger = require("../../middlewares/logBuilder");
var notificationOp = require('../../models/vicinityManager').notification;
var moment = require('moment');
var notifHelper = require('../../services/notifications/notificationsHelper');

/*
Get notifications
*/
function getNotifications(req,res){
  var u_id = mongoose.Types.ObjectId(req.body.decoded_token.uid);
  var c_id = mongoose.Types.ObjectId(req.body.decoded_token.orgid);
  var cid = req.body.decoded_token.cid;
  var mail = req.body.decoded_token.sub;
  var isDevOps = req.body.decoded_token.roles.indexOf('devOps') !== -1;
  var all = req.query.hasOwnProperty('all') ? true : false;
  var searchDate = req.query.hasOwnProperty('searchDate') && req.query.searchDate !== 'undefined' ?
                  notifHelper.objectIdWithTimestamp(req.query.searchDate):
                  notifHelper.objectIdWithTimestamp(moment().subtract(7, 'days').valueOf());
  notifHelper.getNotifications(u_id, c_id, cid, mail, isDevOps, all, searchDate, function(err,response){
    if(err) logger.log(req,res, {data: response, type: "error"});
    res.json({error: err, message: response});
  });
}

// Functions to manipulate notifications
function changeToResponded(req,res){
  var o_id = mongoose.Types.ObjectId(req.params.id);
  var stat = req.query.status;
  notifHelper.changeToResponded(o_id, stat, function(err,response){
    if(err) logger.log(req,res, {data: response, type: "error"});
    res.json({error: err, message: response});
  });
}

// Sets the notification to read
// Accepts single string or array

function changeIsUnreadToFalse(req, res){
  var id = req.params.id;
  var ids = req.body.ids;
  notifHelper.changeIsUnreadToFalse(id, ids, function(err,response){
    if(err) logger.log(req,res, {data: response, type: "error"});
    res.json({error: err, message: response});
  });
}

/*
Export functions
*/

// External rqst
module.exports.getNotifications = getNotifications;
module.exports.changeIsUnreadToFalse = changeIsUnreadToFalse;
module.exports.changeToResponded = changeToResponded;
