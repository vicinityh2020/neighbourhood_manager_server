// Global variables

var mongoose = require('mongoose');
var logger = require("../../middlewares/logBuilder");

var sGetSearch = require("../../services/search/get");
var sPublic = require("../../services/public/statistics");
var sSales = require("../../services/public/sales");


// Main functions - VCNT API

/*
Search --------------------------------------------------
*/

/**
 * Search organisations
 *
 * @param {String} searchTerm (query)
 *
 * @return {Object} Array of orgs
 */
exports.searchOrgs = function(req, res, next) {
  var searchTerm = req.query.searchTerm;
  var cid =  mongoose.Types.ObjectId(req.body.decoded_token.orgid);
  var sT = new RegExp(searchTerm, 'i');
  var api = true; // Call origin api or webApp
  sGetSearch.searchOrganisation(sT, cid, api, function(err, response){
    res.json({error: err, message: response});
  });
};

/**
 * Search users
 *
 * @param {String} searchTerm (query)
 *
 * @return {Object} Array of users
 */
exports.searchUsers = function(req, res, next) {
  var searchTerm = req.query.searchTerm;
  var cid =  mongoose.Types.ObjectId(req.body.decoded_token.orgid);
  var sT = new RegExp(searchTerm, 'i');
  var api = true; // Call origin api or webApp
  sGetSearch.searchUser(sT, cid, api, function(err, response){
    res.json({error: err, message: response});
  });
};

/**
 * Search items
 *
 * @param {String} searchTerm (query)
 *
 * @return {Object} Array of items
 */
exports.searchItems = function(req, res, next) {
  var searchTerm = req.query.searchTerm;
  var cid = mongoose.Types.ObjectId(req.body.decoded_token.orgid);
  var sT = new RegExp(searchTerm, 'i');
  var api = true; // Call origin api or webApp
  sGetSearch.searchItem(sT, cid, api, function(err, response){
    res.json({error: err, message: response});
  });
};

/*
Public --------------------------------------------------
*/

/**
 * Get statistics
 * @return {Object} JSON with NM statistics
 */
exports.getStatistics = function(req, res, next) {
  sPublic.getStatistics(function(err, response){
    if(err) logger.log(req, res, {type: 'error', data: response});
    res.json({error: err, message: response});
  });
};

/**
 * Post a mail to sales
 * @params {Object} Body with the data to complete the mail
 * @return {String} Result acknowledgement
 */
exports.postSales = function(req, res, next) {
  var data = req.body;
  if(!data){
    res.json({error: false, message: "Missing mail parameters"});
  } else {
    sSales.sendMail(data, function(err, response){
      if(err) logger.log(req, res, {type: 'error', data: response});
      res.json({error: err, message: "Message sent to SALES"});
    });
  }
};
