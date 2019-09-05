var messageOp = require('../../models/vicinityManager').message;
var recordOp = require('../../models/vicinityManager').record;

/**
* Store messages from gateway
* @param {}
* @return {Object} Summary of aggregation
*/

function storeCounters(records){
  var toStore = [];
  for(var i = 0, l = records.length; i < l; i++){
    var message = new messageOp();
    message.messageStatus = records[i].messageStatus;
    message.sourceOid = records[i].sourceOid;
    message.destinationOid = records[i].destinationOid;
    message.requestId = records[i].requestId;
    message.timestamp = records[i].timestamp;
    message.reqInitiator = records[i].reqInitiator;
    message.messageSize = Number(records[i].messageSize);
    message.messageType = records[i].messageType;
    message.requestType = getType(records[i].messageType);
    toStore.push(message.save());
  }
  return Promise.all(toStore);
}

/**
* Process messages in NM
* @param {Array} records
* @return {Promise}
*/

function aggregateCounters(){

  return messageOp.aggregate([
    {$match: {"isProcessed": false, "reqInitiator": true}},
    {$project: {"date": { $dateFromParts : { "year": { $year: "$timestamp" }, "month": { $month: "$timestamp" },  "day": { $dayOfMonth: "$timestamp" }}}, "messageSize": "$messageSize", "requestType": "$requestType", "oid": "$sourceOid" }},
    {$lookup: { from: "items", localField: "oid", foreignField: "oid", as: "item" } },
    {$project: {"date": "$date", "requestType": "$requestType", "messageSize": "$messageSize" ,"oid": "$oid", "agid": "$item.adid.extid", "cid": "$item.cid.extid"}},
    {$unwind:"$agid"},
    {$unwind:"$cid"},
    {$group: {"_id": { agid: "$agid", "oid": "$oid", "cid": "$cid", "date": "$date"} ,
              "totalSize": {$sum: "$messageSize"},
              "action":{$sum: { $cond: [{$eq: [ "$requestType", "action" ]}, 1, 0]  } },
              "property":{$sum: { $cond: [{$eq: [ "$requestType", "property" ]}, 1, 0]  } },
              "event":{$sum: { $cond: [{$eq: [ "$requestType", "event" ]}, 1, 0]  } },
              "info":{$sum: { $cond: [{$eq: [ "$requestType", "info" ]}, 1, 0]  } },
              "unknown":{$sum: { $cond: [{$eq: [ "$requestType", "unknown" ]}, 1, 0]  } } } }
  ])
  .then(function(response){
    var toStore = [];
    for(var i = 0, l = response.length; i < l; i++){
      toStore.push(
        recordOp.update({date: response[i]._id.date, oid: response[i]._id.oid},
          { $inc: {totalSize: response[i].totalSize, action: response[i].action, event: response[i].event, property: response[i].property, info: response[i].info, unknown: response[i].unknown},
            $set: {agid: response[i]._id.agid, cid: response[i]._id.cid}
          }, {upsert: true})
      );
    }
    return Promise.all(toStore);
  })
  .then(function(response){
    return messageOp.update({"isProcessed": false}, {$set: {"isProcessed": true}}, {multi: true})
  })
}

/**
* Get counters by CID
* @param {String} CID
* @return {Array of Objects}
*/

function getCounters(args){
  var query = {}; // Level selection
  var d_query = {}; // Date selection
  // Find which level is being queried
  if(args.cid){ query = {cid: args.cid} }
  else if(args.agid){ query = {agid: args.agid} }
  else if(args.oid){ query = {oid: args.oid} }
  else { Promise.reject("Type of id not found!") }
  // Find date range (day, week, month, total)
  var d_string = args.date;
  var d = new Date();
  var d_now = new Date();
  if(d_string === "day"){ d.setDate(d.getDate()-1) }
  else if(d_string === "week"){ d.setDate(d.getDate()-8) }
  else if(d_string === "month"){ d.setDate(d.getDate()-31) }
  else if(d_string === "year"){ d.setDate(d.getDate()-366) }
  else { Promise.reject("Date not found!") }
  d.setHours(0,0,0,0); // Remove hours from date
  d_now.setHours(0,0,0,0); // Remove hours from date
  d_query = {$gte: d, $lt: d_now}; // Exclude today from query, not calc yet!
  // Get values
  return recordOp.aggregate([
    {$match: query},
    {$sort: {_id: 1}},
    {$group: {"_id": {"date": "$date"} , "totalSize": {$sum: "$totalSize"}, "action": {$sum: "$action"}, "property": {$sum: "$property"}, "event": {$sum: "$event"}, "info": {$sum: "$info"}, "unknown": {$sum: "$unknown"} }},
    {$match: { "_id.date" : d_query} }
  ]);
}


////// PRIVATE FUNCTIONS

/**
* Get counters by CID
* @param {String} messageType
* @return {String} requestType
*/

function getType(x){
  var actions = ["CANCELTASK", "GETLISTOFACTIONS", "GETTASKSTATUS", "STARTACTION"];
  var events = ["GETEVENTCHANNELSTATUS", "GETLISTOFEVENTS", "SUBSCRIBETOEVENTCHANNEL", "UNSUBSCRIBEFROMEVENTCHANNEL"];
  var properties = ["GETLISTOFPROPERTIES", "GETPROPERTYVALUE", "SETPROPERTYVALUE"];
  var agent = ["GETTHINGDESCRIPTION"];
  if(actions.indexOf(x) != -1){ return "action" }
  else if(events.indexOf(x) != -1){ return "event" }
  else if(properties.indexOf(x) != -1){ return "property" }
  else if(agent.indexOf(x) != - 1){ return "info" }
  else { return "unknown" }
}

///// EXPORT MODULES

module.exports.storeCounters = storeCounters;
module.exports.aggregateCounters = aggregateCounters;
module.exports.getCounters = getCounters;
