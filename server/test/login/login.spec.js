//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();
var logger = require("../../middlewares/logger");
var userOp = require('../../models/vicinityManager').user;
var userAccountsOp = require('../../models/vicinityManager').userAccount;
var jwt = require('../../services/jwtHelper');
var mongoose = require('mongoose');
var uuid = require('uuid');

chai.use(chaiHttp);

// Global variables

var token;

// tests
// before(function() {
// });

/*
  Test Authetication possible errors
*/
describe('Authentication test scenario', function(){
  it('Get wrong password error - 401', loginWrongPassword);
  it('Get wrong username error - 404', loginWrongName);
  it('Get missing fields - 400', loginMissingField);
  it('Generate token successfully - 200', loginSuccess);
  it('Update password', updatePwd);
});

// *************** Functions ***************

/*
 LOGIN scenarios
*/

function loginSuccess(done){
  var data = {};
  data.username = "admin@admin.com";
  data.password = "password";
  chai.request(server)
    .post('/api/authenticate')
    .send(data)
    .end(function(err, res){
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.have.property('token');
      res.body.message.token.should.be.a('string');
      res.body.message.should.have.property('cid');
      res.body.message.cid.should.be.a('string');
      res.body.message.should.have.property('uid');
      res.body.message.uid.should.be.a('string');
      token = res.body.message.token;
      done();
    });
  }

function loginWrongPassword(done){
   var data = {
      username: "admin@admin.com",
      password: "wrongPwd"
    };
   chai.request(server)
      .post('/api/authenticate')
      .send(data)
      .end(function(err, res){
        res.should.have.status(401);
        res.body.should.be.a('object');
        done();
      });
}

function loginWrongName(done){
   var data = {
      username: "wrong@wrong.com",
      password: "password"
    };
   chai.request(server)
      .post('/api/authenticate')
      .send(data)
      .end(function(err, res){
        res.should.have.status(404);
        res.body.should.be.a('object');
        done();
      });
}

function loginMissingField(done){
   var data = {
      username: "admin@admin.com",
    };
   chai.request(server)
      .post('/api/authenticate')
      .send(data)
      .end(function(err, res){
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
    }

  function updatePwd(done){
     var data = {
        type: "password",
        data: {
          oldPwd: "password",
          newPwd: "password"
        }
      };
     chai.request(server)
        .put('/api/users/5bd2cee23b93b3ac41598df5')
        .set('x-access-token', token)
        .send(data)
        .end(function(err, res){
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.message.should.be.a('string');
          //res.body.message.should.equal('Password updated');
          done();
    });
  }
