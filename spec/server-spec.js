var expect = require('chai').expect;
var request = require('request');

var db = require('./src/db/schema');
var controller = require('./src/server/controller');
var routes = require('./src/server/routes');
var app = require('./src/server/server');


var beforeEach = function() {};


describe('Sign up', function() {
  var server;

  before(function() {
    server = app.listen(4568, function() {
      console.log('Test is listening on 4568');
    });
  });

  after(function() {
    server.close();
  });

  describe('Adds username to the database on sign up', function() {

  });

  describe('Adds hashed password to database on sign up', function() {

  });

  describe('Indicates when username is already taken', function() {

  });

  describe('Redirects to sign in page when user enters account info in database', function() {

  });
}

describe('Sign in', function() {
  var server;

  before(function() {
    server = app.listen(4568, function() {
      console.log('Test is listening on 4568');
    });
  });

  after(function() {
    server.close();
  });

  describe('Prompts to correct password if stored username is entered but password does not match', function() {

  });

  describe('Redirects to home page if correct username and password info entered', function() {

  });
}

describe('Sign out', function() {
  var server;

  before(function() {
    server = app.listen(4568, function() {
      console.log('Test is listening on 4568');
    });
  });

  after(function() {
    server.close();
  });

  describe('Redirects to sign out page', function() {

  });
}

