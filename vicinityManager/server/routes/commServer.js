var express = require('express');
var router = express.Router();

var commServerPost = require('../helpers/commServer/incomePost');

router
  .post('/', commServerPost.postResource);

module.exports = router;
