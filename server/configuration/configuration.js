/*
Configuration sheet:
Security
URLs
Avatars
*/

var config = module.exports = {};

/*
NODEJS SERVER PARAMETERS
*/
// Environment
config.env = process.env.env || "test";
//Token Secret
config.jwtTokenSecret = process.env.SERVER_JWT_SECRET || "myfancytokensecretfortestingpurposes";
// Platform base href
config.baseHref = process.env.SERVER_UI_BASE_HREF;
// Vicinity services dir
config.vicinityServicesDir = process.env.vicinityServicesDir;
// SSL certificates
config.ssl = process.env.SERVER_SSL_ENABLE === "true";
config.cert = process.env.SERVER_SSL_CERT;
config.key = process.env.SERVER_SSL_KEY;
// Logs files
config.technicalLog = process.env.technicalLog;
config.profilerLog = process.env.profilerLog;
// Max payload size
config.maxPayload = process.env.SERVER_MAX_PAYLOAD || "10mb";

/*
COMMUNICATION SERVER
*/
// Token Secret
if(process.env.COMMSERVER_TOKEN){
  config.commServerToken = "Basic " + new Buffer(process.env.COMMSERVER_TOKEN).toString('base64');
}
// URL
config.commServerUrl = process.env.COMMSERVER_URL;
// Disable encryption
config.commServerInsecure = process.env.COMMSERVER_INSECURE === "true";
// Host present in certificate
config.commServerHost = process.env.COMMSERVER_HOST;
// Timeout ( if 0 -> no timeout is set)
config.commserverTimeoutMs = process.env.COMMSERVER_TIMEOUT_MS !== undefined ? Number(process.env.COMMSERVER_TIMEOUT_MS) : 10000;


/*
SMTP CONFIGURATION
*/
config.smtpHost = process.env.SMTP_HOST;
config.smtpUser = process.env.SMTP_USER;
config.smtpPassword = process.env.SMTP_PASSWORD;
config.mailServer = process.env.SMTP_MAIL_SERVER;
config.approverMail = process.env.SMTP_APPROVER_MAIL;


/*
SEMANTIC REPOSITORY
*/
//URL
config.semanticRepoUrl = process.env.SEMANTIC_REPO_URL;
// Timeout ( if 0 -> no timeout is set )
config.semanticrepoTimeoutMs = process.env.SEMANTIC_REPO_TIMEOUT_MS !== undefined ? Number(process.env.SEMANTIC_REPO_TIMEOUT_MS) : 10000;
// Types of adapters that use VCNT semantic repository
if(process.env.SEMANTIC_REPO_ADAPTERS){
  config.enabledAdapters = process.env.SEMANTIC_REPO_ADAPTERS.split(' ');
} else {
  config.enabledAdapters = ["generic.adapter.vicinity.eu"];
}

/*
DEFAULT LOGOS & AVATARS
*/
//Avatar Defaults
 config.avatarUser="data:image/png;base64,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";

 config.avatarOrg="data:image/png;base64,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";

 config.avatarItem="data:image/png;base64,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";
