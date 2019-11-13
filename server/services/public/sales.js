var config = require('../../configuration/configuration');

/**
 * Post a mail to sales
 * @params {Object} Contains strings (email, name, plan, comments)
 * @return {String} Result acknowledgement
 */
function sendMail(data, callback) {
  var mailInfo = {
      tmpName : "sales",
      name : data.name,
      plan: data.plan,
      comments: data.comments,
      customerMail: data.email,
      subject : 'New sales inquiry',
      emailTo : config.salesMail
    };
  mailing.sendMail(mailInfo)
  .then(function(response){
    callback(false, "Success");
  })
  .catch(function(error){
    callback(true, error);
  });
}

module.exports.sendMail = sendMail;
