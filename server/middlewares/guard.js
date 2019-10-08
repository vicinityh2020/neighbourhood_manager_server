var jwt = require('jsonwebtoken');
var logger = require("../middlewares/logBuilder");

module.exports = function(req, res, next) {

  var auth = req.headers['authorization'];
  var auth_str = new Buffer(process.env.COMMSERVER_TOKEN).toString();
  console.log(auth_str);

  // if (token) {
  //   try {
  //     var decoded = jwt.decode(token, config.jwtTokenSecret);
  //     if (decoded.exp <= Date.now()) {
  //       res.end('access token has expired', 400);
  //     } else {
  //       req.body.token = token;
  //       req.body.decoded_token = decoded;
  //       return next();
  //     }
  //   } catch (err) {
  //     logger.log(req, res, {type: 'error', data: "JWT Validation error: " + err.text});
  //     return res.sendStatus(401);
  //   }
  // } else {
  //   logger.log(req, res, {type: 'debug', data: "No token!!"});
  //   return res.sendStatus(401);
  // }
  // logger.log(req, res, {type: 'info', data: "JWTAuth done"});
};
