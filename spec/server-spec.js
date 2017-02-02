var expect = require('chai').expect;
var request = require('request');
var bcrypt = require('bcrypt');

var db = require('../src/db/schema');
var controller = require('../src/server/controller');
var routes = require('../src/server/routes');
var app = require('../src/server/server');


var beforeEach = function() {};

describe('', function() {

  var server;

  before(function() {
    server = app.listen(4568, function() {
      console.log('Test server is listening on 4568');
    });

    db.User.destroy({
        where: { username: 'sterlingarcher' }
      });
  });

  after(function() {
    server.close();
  });

  beforeEach(function() {
    // log out currently signed in user, if any
    request('http://127.0.0.1:4568/api/signout', function(err, res, body) {});

    // remove Sterling Archer from db
    db.User.destroy({
      where: { username: 'sterlingarcher' }
    }).then(function(results) {
      console.log('results', results);
    });
  });


  describe('Sign up:', function() {

    it('Adds username to the database on sign up', function(done) {
      var options = {
        'method': 'POST',
        'followAllRedirects': true,
        'uri': 'http://127.0.0.1:4568/api/signup',
        'json': {
          'username': 'sterlingarcher',
          'password': 'phrasing'
        }
      };

      request(options, function(error, res, body) {
        // find db record for sterlingarcher
        db.User.findAll({
          where: { username: 'sterlingarcher' }
        }).then(function(results) {
          var foundUsername = results[0].dataValues.username;
          // verify that db username is username entered through sign up page
          expect(foundUsername).to.equal('sterlingarcher');
          done();
        });
      });
    });

    it('Adds hashed password to database on sign up', function(done) {
      // find db record for sterlingarcher
      db.User.findAll({
        where: { username: 'sterlingarcher' }
      }).then(function(results) {
        var foundPassword = results[0].dataValues.password;
        // verify that stored pw is not plaintext
        expect(foundPassword).to.not.equal('phrasing');

        // verifies that plaintext password matches stored hash
        bcrypt.compare('phrasing', foundPassword, function(err, comparison) {
          if (err) {
            console.log('Error in comparison', err);
          } else {
            expect(comparison).to.equal(true);
            done();
          }
        });
      });
    });

    // it('Indicates when username is already taken', function(done) {

    // });

    // it('Tells user to use sign in page when user enters account info in database', function(done) {

    // });
  });

  describe('Sign in:', function() {
    db.User.create({
      username: 'sterlingarcher',
      password: 'phrasing'
    });

    it('Prompts user to correct password if stored username is entered but password does not match', function(done) {
      var options = {
        'method': 'POST',
        'uri': 'http://127.0.0.1:4568/api/signin',
        'json': {
          'username': 'sterlingarcher',
          'password': 'lana'
        }
      };

      request(options, function(err, res, body) {
        expect(res.statusCode).to.equal(404);
        done();
      });
    });

    it('Redirects to home page if correct username and password info entered', function(done) {
      var options = {
        'method': 'POST',
        'uri': 'http://127.0.0.1:4568/api/signin',
        'json': {
          'username': 'sterlingarcher',
          'password': 'phrasing'
        }
      }

      request(options, function(err, res, body) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('Sign out:', function() {
    var server;

    before(function() {
      server = app.listen(4568, function() {
        console.log('Test is listening on 4568');
      });
    });

    after(function() {
      server.close();
    });

    it('Redirects to sign out page', function(done) {

    });
  });

  describe('Posting:', function() {
    var server;

    before(function() {
      server = app.listen(4568, function() {
        console.log('Test is listening on 4568');
      });
    });

    after(function() {
      server.close();
    });

    it('Retrieves latest 10 posts from database for frontend to render', function(done) {

    });

    it('Adds brand new post to database', function(done) {

    });

    it('Does not add identical posts to database', function(done) {

    });

    it('Deletes post from database when user removes post', function(done) {

    });
  });

  describe('Tagging:', function() {
    var server;

    before(function() {
      server = app.listen(4568, function() {
        console.log('Test is listening on 4568');
      });
    });

    after(function() {
      server.close();
    });

    it('Retrieves all created tags for frontend render', function(done) {

    });

    it('Adds correct tags to post', function(done) {

    });

    it('Deletes tag from post in database when user removes tag', function(done) {

    });
  });

  describe('Categories:', function() {
    var server;

    before(function() {
      server = app.listen(4568, function() {
        console.log('Test is listening on 4568');
      });
    });

    after(function() {
      server.close();
    });

    it('Correctly adds category to post', function(done) {

    });

    it('Can add brand new category', function(done) {

    });
  });

  describe('Ranking:', function() {
    var server;

    before(function() {
      server = app.listen(4568, function() {
        console.log('Test is listening on 4568');
      });
    });

    after(function() {
      server.close();
    });

    it('Adds one to vote count when user upvotes post', function(done) {

    });

    it('Subtracts one from vote count when user downvotes post', function(done) {

    });

    it('Decrements vote count even when vote is zero or negative', function(done) {

    });
  });
})
