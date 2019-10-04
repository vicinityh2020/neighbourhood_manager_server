var express = require('express');
var router = express.Router();
var logger = require("../middlewares/logger");

var getHelper = require('../controllers/nodes/get.js');
var postHelper = require('../controllers/nodes/post.js');
var putHelper = require('../controllers/nodes/put.js');
var keyHelper = require('../controllers/nodes/key.js');

router
  .get('/:id', getHelper.getAll)
  .get('/node/:id', getHelper.getOne)
  .post('/', postHelper.postOne)
  .put('/:id', putHelper.putOne)
  .get('/key/:id', keyHelper.find)
  .post('/key/:id', keyHelper.upsert)
  .delete('/key/:id', keyHelper.remove);


module.exports = router;
