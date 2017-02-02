var expect = require('chai').expect;
var request = require('request');

var db = require('../src/db/schema');
var controller = require('../src/server/controller');
var routes = require('../src/server/routes');
var app = require('../src/server/server');


var beforeEach = function() {};


describe('Sign up', function() {
  var server;

  before(function() {
    server = app.listen(3000, function() {
      console.log('Test is listening on 3000');
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
});

describe('Sign in', function() {
  var server;

  before(function() {
    server = app.listen(3000, function() {
      console.log('Test is listening on 3000');
    });
  });

  after(function() {
    server.close();
  });

  describe('Prompts to correct password if stored username is entered but password does not match', function() {

  });

  describe('Redirects to home page if correct username and password info entered', function() {

  });
});

describe('Sign out', function() {
  var server;

  before(function() {
    server = app.listen(3000, function() {
      console.log('Test is listening on 3000');
    });
  });

  after(function() {
    server.close();
  });

  describe('Redirects to sign out page', function() {

  });
});

describe('Posting', function() {
  var server;

  before(function() {
    server = app.listen(3000, function() {
      console.log('Test is listening on 3000');
    });
  });

  after(function() {
    server.close();
  });

  describe('Retrieves latest 10 posts from database for frontend to render', function() {

  });

  describe('Adds brand new post to database', function() {

  });

  describe('Does not add identical posts to database', function() {

  });

  describe('Deletes post from database when user removes post', function() {

  });
});

describe('Tagging', function() {
  var server;

  before(function() {
    server = app.listen(3000, function() {
      console.log('Test is listening on 3000');
    });
  });

  after(function() {
    server.close();
  });

  describe('Retrieves all created tags for frontend render', function() {

  });

  describe('Adds correct tags to post', function() {

  });

  describe('Deletes tag from post in database when user removes tag', function() {

  });
});

describe('Categories', function() {
  var server;

  before(function() {
    server = app.listen(3000, function() {
      console.log('Test is listening on 3000');
    });
  });

  after(function() {
    server.close();
  });

  describe('Correctly adds category to post', function() {

  });

  describe('Can add brand new category', function() {

  });
});

describe('Ranking', function() {
  var server;

  before(function() {
    server = app.listen(3000, function() {
      console.log('Test is listening on 3000');
    });
  });

  after(function() {
    server.close();
  });

  describe('Adds one to vote count when user upvotes post', function() {

  });

  describe('Subtracts one from vote count when user downvotes post', function() {

  });

  describe('Decrements vote count even when vote is zero or negative', function() {

  });
});
