var express = require('express');
var router = express.Router();
var jwt = require("../middlewares/jwtauth"); // NM client token validation
var guard = require("../middlewares/guard"); // Gateway token validation
var controllers = require('../controllers/commServer/commServer');

// Endpoints accessible from the gateway

router
// items
.get('/items/:oid', guard, controllers.neighbourhood)
.post('/items/register', guard, controllers.registration)
.post('/items/td', guard, controllers.td)
.post('/items/searchItems', guard, controllers.searchItems)
.post('/items/remove', guard, controllers.deleteItems)
.post('/items/enable', guard, controllers.enableItems)
.post('/items/disable', guard, controllers.disableItems)
.put('/items/modify', guard, controllers.updateItem) // Update item
.put('/items/update', guard, controllers.updateItemContent) // Update only TDs non critial properties
// agent
.get('/handshake', guard, controllers.handshake)
.post('/counters', guard, controllers.sendCounters)
.get('/counters', jwt, controllers.getCounters) // GET THEM IN QUERY PARAMS
.get('/counters/aggregate', controllers.aggregateCounters)
.get('/agent/:agid/items', guard, controllers.getAgentItems) // change to post if depends on update or use query
.delete('/agent/:agid', guard, controllers.deleteAgent);

module.exports = router;
