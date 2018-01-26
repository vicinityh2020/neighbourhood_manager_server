// Global variables and definitions =========

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var Schema = mongoose.Schema;

// Vicinity subSchemas - Replace repeated structures

var cidSchema = Schema({
  id: {type: ObjectId, ref: 'userAccount'},
  extid: String
},{ _id : false });

var adidSchema = Schema({
  id: {type: ObjectId, ref: 'node'},
  extid: String
},{ _id : false });

var uidSchema = Schema({
  id: {type: ObjectId, ref: 'user'},
  extid: String
},{ _id : false });

var oidSchema = Schema({
  id: {type: ObjectId, ref: 'item'},
  extid: String
},{ _id : false });

var ctidSchema = Schema({
  id: {type: ObjectId, ref: 'contract'},
  extid: String,
  contractingUser: String,
  contractingParty: String,
  approved: {type: Boolean, default: false}
},{ _id : false });

var contractSubschema = Schema({
  cid: cidSchema,
  uid: uidSchema,
  termsAndConditions: {type: Boolean, default: false},
  items: [ oidSchema ]
},{ _id : false });

// Vicinity neighorhood schemas ============

var userAccount = new Schema({
  name: {type: String, required: true},
  cid: {type: String, required: true},
  businessId : {type: String, required: true},
  accountOf:[ uidSchema ],
  knows:[ cidSchema ],
  knowsRequestsFrom:[ cidSchema ],
  knowsRequestsTo:[ cidSchema ],
  hasNodes:[ adidSchema ],
  hasNotifications: [{ type: ObjectId, ref: 'notification' }],
  skinColor: {type: String, enum: ['blue', 'red', 'green', 'purple', 'yellow', 'black']},
  avatar: String,
  location: String,
  notes: String,
  status: {type: String, enum: ['active', 'deleted'], default: 'active'},
});

var user = new Schema({
  name: {type: String},
  email: {type: String, required: true},
  cid: cidSchema,
  occupation: String,
  location: String,
  avatar: String,
  status: {type: String, enum: ['active', 'deleted'], default: 'active'},
  accessLevel: {type: Number, enum: [0, 1, 2], default: 0},
  /* 0 - Only organisation
  1 - Friends
  2 - Everyone */
  authentication: {
    password: String,
    principalRoles: [ String ]
  },
  hasItems: [ oidSchema ], // Own items and foreign items under contract
  hasContracts: [ ctidSchema ]
});

var node = new Schema({
  adid: {type: String, required: true},
  name: {type: String, required: true},
  cid: cidSchema,
  type: [ String ],
  status: {type: String, enum: ['active', 'deleted']},
  hasItems: [ oidSchema ],
  eventUri: String,
  agent: String
});

var item = new Schema({
  name: {type: String, required: true},
  avatar: String,
  oid: {type: String, required: true}, // Object id -- different to Mongo uid
  adid: adidSchema, // Agent id
  cid: cidSchema,
  uid: uidSchema,
  hasContracts: [ ctidSchema ],
  accessLevel: {type: Number, enum: [0, 1, 2], default: 0},
  typeOfItem: {type: String, enum: ['device','service']},
  status: {type: String, enum: ['disabled', 'enabled', 'deleted'], default: 'disabled'}, // Enabled, disabled or deleted
  info: mongoose.Schema.Types.Mixed // Thing description, object with flexible schema
});

var contract = new Schema({
ctid: {type: String, required: true},
serviceProvider: contractSubschema,
iotOwner: contractSubschema,
readWrite: Boolean, // True RW -- False R
legalDescription: String,
type: { type: String, enum: ['serviceRequest', 'deviceUse']},
status: { type: String, enum: ['pending', 'accepted', 'rejected', 'deleted'], default: 'pending'}
});

var invitation = new Schema({
    emailTo: String,
    nameTo: String,
    sentBy: {
        name: String,
        companyId: { type: ObjectId, ref: 'userAccount'},
        organisation: String,
        email: String
    },
    type: {type: String, enum: ['newCompany','newUser']}
});

var registration = new Schema({
    userName: String,
    email: String,
    password: String,
    occupation: String,
    companyId: { type: ObjectId, ref: 'userAccount'},
    companyName: String,
    companyLocation: String,
    termsAndConditions: Boolean,
    businessId: String,
    status: {type: String, enum: ['open','verified','declined','pending']},
    type: {type: String, enum: ['newCompany','newUser']}
});

var notification = new Schema({
    addressedTo: [{ type: ObjectId, ref: 'userAccount' }],
    sentBy: { type: ObjectId, ref: 'userAccount' },
    sentByReg: { type: ObjectId, ref: 'registration' },
    itemId: { type: ObjectId, ref: 'item' },
    ctId: { type: ObjectId, ref: 'contract' },
    userId: { type: ObjectId, ref: 'user' },
    isUnread: { type: Boolean, default: true },
    status: {type: String, enum: ['waiting', 'info', 'accepted', 'rejected', 'responded'], required: true},
    type: {type: Number, enum: [1, 11, 12, 13, 21, 22, 23, 24, 31, 32, 33, 34, 35, 36], required: true}
    /*
    1 - registrationRequest - toAnswer
    11 - itemEnabled - info
    12 - itemDisabled - info
    13 - itemDiscovered - info
    21 - contractRequest - info
    22 - contractModified - info
    23 - contractCancelled - info
    24 - contractAccepted - info
    31 - partnershipRequest  - toAnswer
    32 - partnershipCancelled - info
    33 - partnershipRejected - info
    34 - partnershipAccepted - info
    35 - partnershipRequested - info
    36 - partnershipRequestCancelled - info
    ...
    */
});

var remember = new Schema({
  token: {type: String, required: true},
});

var auditLog = new Schema({
  auditId: {type: String, required: true}, // Can be oid or cid (extid)
  data: [ {
    creationDate: { type: Date, default: Date.now },
    triggeredByMe: { type: Boolean, default: true }, // Was the audit triggered by an event in your organisation??
    user: { type: String, default: "Unknown" }, // User generating the event
    orgOrigin: cidSchema, // Organisation generating the event
    orgDest: cidSchema, // Organisation receiving the event
    auxConnection: { // Depending on the audit, we need another connection to user, org, item or node
      kind: String,
      item: { type: ObjectId, refPath: 'data.auxConnection.kind' },
      extid: String
    },
    description: { type: String }, // Additional info like: Privacy lvl, new user role, ...
    eventType: { type: Number, enum: [1, 2, 11, 12, 13, 21, 22, 23, 31, 32, 33, 34, 35, 41, 42, 43, 44, 45, 51, 52, 53, 54, 55], required: true } // Actual situation which triggered the audit
    /*
    Organisation:
    1 - Created ->
    2 - Deleted ->
    11 - New user ->
    12 - User deleted ->
    13 - User modified ->
    21 - New node ->
    22 - Node deleted ->
    23 - Node modified ->
    31 - Request partnership <->
    32 - Cancel request <->
    33 - Accept partnership <->
    34 - Reject partnership <->
    35 - Cancel partnership <->
    Item:
    41 - Item discovered ->
    42 - Item deleted ->
    43 - Item enabled ->
    44 - Item disabled ->
    45 - Privacy change ->
    51 - Accept contract <->
    52 - Cancel contract <->
    53 - Request contract <->
    54 - Update contract <->
    ...
    */
  } ]
});

// Set schema options ==================================

// TODO Set all autoIndex to false when moving to production
// autoIndex option ensures that the index is created, BUT is heavily time consuming
userAccount.set('autoIndex',true);
user.set('autoIndex',true);
item.set('autoIndex',true);
notification.set('autoIndex',true);
invitation.set('autoIndex',true);
registration.set('autoIndex',true);
remember.set('autoIndex',true);
node.set('autoIndex',true);
auditLog.set('autoIndex',true);
contract.set('autoIndex',true);

// Converts the mongoose document into a plain javascript object
// userAccount.set('toJSON',{ getters: true, virtuals: false });

// Ensures that values passed to our model constructor that
// were not specified in our schema do not get saved to the db
// Set to true by default
// userAccount.set('strict',true);
// ...

// Indexes to perform text search =======================

/* Only works for FULL TEXT search !!!!
userAccount.index({name: 'text'});
user.index({name: 'text'});
item.index({name: 'text'}); */

// Indexes for common field searchUser  =================
// TODO set the index as unique once server side and agent are prepared
userAccount.index({name: 1}, { unique: false });
userAccount.index({cid: 1}, { unique: false });
user.index({name: 1}, { unique: false });
user.index({email: 1}, { unique: false });
// item.index({name: 1, oid: 1}); // Compound indexes cannot be created in the schema definition!
item.index({name: 1}, { unique: false });
item.index({oid: 1}, { unique: false });
node.index({adid: 1}, { unique: false });
auditLog.index({auditId: 1}, { unique: true});
contract.index({ctid: 1}, { unique: true});


// Exports models  ===============================

module.exports.userAccount = mongoose.model('userAccount', userAccount);
module.exports.user = mongoose.model('user', user);
module.exports.item = mongoose.model('item', item);
module.exports.notification = mongoose.model('notification', notification);
module.exports.invitation = mongoose.model('invitation', invitation);
module.exports.registration = mongoose.model('registration', registration);
module.exports.remember = mongoose.model('remember', remember);
module.exports.node = mongoose.model('node', node);
module.exports.auditLog = mongoose.model('auditLog', auditLog);
module.exports.contract = mongoose.model('contract', contract);
