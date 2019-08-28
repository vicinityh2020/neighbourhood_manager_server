var messageOp = require('../../models/vicinityManager').message;
var counterOp = require('../../models/vicinityManager').counter;

/**
* Store messages from gateway
* @param {}
* @return {Object} Summary of aggregation
*/

function storeCounters(records){
  var toStore = [];
  console.log("Storing records...");
  for(var i = 0, l = records.length; i < l; i++){
    var message = new messageOp();
    message.messageStatus = records[i].messageStatus;
    message.sourceOid = records[i].sourceOid;
    message.destinationOid = records[i].destinationOid;
    message.requestId = records[i].requestId;
    message.timestamp = records[i].timestamp;
    message.reqInitiator = records[i].reqInitiator;
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
// get messages db
// aggregate
// filter by date
// cummulate totals
// create array destOids
// create array messageTypes

// Process and add to counter db type if exists

// store
}

/**
* Get counters by CID
* @param {String} CID
* @return {Array of Objects}
*/

function getCounters(){}


////// PRIVATE FUNCTIONS

/**
* Get counters by CID
* @param {String} messageType
* @return {String} requestType
*/

function getType(x){
  var y = "unknown";
  var actions = ["CANCELTASK", "GETLISTOFACTIONS", "GETTASKSTATUS", "STARTACTION"];
  var events = ["GETEVENTCHANNELSTATUS", "GETLISTOFEVENTS", "SUBSCRIBETOEVENTCHANNEL", "UNSUBSCRIBEFROMEVENTCHANNEL"];
  var properties = ["GETLISTOFPROPERTIES", "GETPROPERTYVALUE", "SETPROPERTYVALUE"];
  var agent = ["GETTHINGDESCRIPTION"];
  if(actions.indexOf(x) != -1) y = "action";
  if(events.indexOf(x) != -1) y = "event";
  if(properties.indexOf(x) != -1) y = "property";
  if(agent.indexOf(x) != - 1) y = "info";
  return y;
}

///// EXPORT MODULES

module.exports.storeCounters = storeCounters;
module.exports.aggregateCounters = aggregateCounters;
module.exports.getCounters = getCounters;
