var express = require('express');
var router = express.Router();
var jwt = require("../middlewares/jwtauth");
var guard = require("../middlewares/guard");
var controllers = require('../controllers/commServer/commServer');

// Endpoints accessible from the gateway

router
// items
.get('/items/:oid', controllers.neighbourhood)
.post('/items/register', controllers.registration)
.post('/items/td', controllers.td)
.post('/items/searchItems', controllers.searchItems)
.post('/items/remove', controllers.deleteItems)
.post('/items/enable', controllers.enableItems)
.post('/items/disable', controllers.disableItems)
.put('/items/modify', controllers.updateItem) // Update item
.put('/items/update', controllers.updateItemContent) // Update only TDs non critial properties
// agent
.get('/handshake', guard, controllers.handshake)
.post('/counters', controllers.sendCounters)
.get('/counters', jwt, controllers.getCounters) // GET THEM IN QUERY PARAMS
.get('/counters/aggregate', controllers.aggregateCounters)
.get('/agent/:agid/items', controllers.getAgentItems) // change to post if depends on update or use query
.delete('/agent/:agid', controllers.deleteAgent);

module.exports = router;
