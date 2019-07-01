var express = require('express');
var router = express.Router();

var controllers = require('../controllers/operational/operational');

// Endpoints accessible from the gateway

router
// items
.put('/items/enable', controllers.enable)
.put('/items/disable', controllers.disable)
.post('/contracts/remove', controllers.removeContracts)
.post('/organisation/remove', controllers.removeOrganisation);

module.exports = router;
