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
    toStore.push(message.save());
  }
  return Promise.all(toStore);
}

/**
* Store messages from gateway
* @param {Array} records
* @return {Promise}
*/

function aggregateCounters(){
  // console.log("Storing records...");
  // for(var i = 0, l = records.length; i < l; i++){
  //   var message = new messageOp();
  //   message.messageStatus = records[i].messageStatus;
  //   message.sourceOid = records[i].sourceOid;
  //   message.destinationOid = records[i].destinationOid;
  //   message.requestId = records[i].requestId;
  //   message.timestamp = records[i].timestamp;
  //   toStore.push(message.save());
  // }
  // return Promise.all(toStore);
}

module.exports.storeCounters = storeCounters;
module.exports.aggregateCounters = aggregateCounters;
