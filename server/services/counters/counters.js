var messageOp = require('../../models/vicinityManager').message;

/**
* Store messages from gateway
* @param {Array} records
* @return {Promise}
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
    toStore.push(message.save());
  }
  return Promise.all(toStore);
}

module.exports.storeCounters = storeCounters;
