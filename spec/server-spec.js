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


  xdescribe('Sign up:', function() {

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

    // TODO: fill out test when error components are complete
    xit('Indicates when username is already taken', function(done) {

    });

    // TODO: fill out test when error components are complete
    xit('Tells user to use sign in page when user enters account info in database', function(done) {

    });
  });

  xdescribe('Sign in:', function() {
    // db.User.create({
    //   username: 'sterlingarcher',
    //   password: 'phrasing'
    // });

    // TODO: test status code when frontend components complete
    xit('Prompts user to correct password if stored username is entered but password does not match', function(done) {
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

    // TODO: test status code when frontend components complete
    xit('Redirects to home page if correct username and password info entered', function(done) {
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

  // TODO: test status code and/or session when frontend components complete and authentication/sessions done
  xdescribe('Sign out:', function() {

    it('Redirects to sign out page', function(done) {
      var options = {
        'method': 'POST',
        'uri': 'http://127.0.0.1:4568/api/signout',
      }

      request(options, function(err, res, body) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  xdescribe('Posting:', function() {

    // for (var i = 1; i < 15; i++) {
    //   db.Post.create({
    //     problem_statement: 'problem' + i,
    //     resource: 'link' + i,
    //     vote_count: 0
    //   });
    // }
    
    xit('Retrieves latest 10 posts from database for frontend to render', function(done) {
      var options = {
        'method': 'GET',
        'url': 'http://127.0.0.1:4568/api/posts'
      }

      request(options, function(err, res, body) {
        console.log(res.body);
        expect(res.statusCode).to.equal(200);
        // expect(res.body.id)
        done();
      });
    });

    // it('Adds brand new post to database', function(done) {

    // });

    xit('Does not add identical posts to database', function(done) {
      var options = {
        'method': 'POST',
        'uri': 'http://127.0.0.1:4568/api/submit',
        'json': {
          'problem_statement': 'problem3',
          'resource': 'link3'
        }
      };

      request(options, function(err, res, body) {

      })
    });

    xit('Deletes post from database when user removes post', function(done) {
      var options = {
        'method': 'POST',
        'uri': 'http://127.0.0.1:4568/api/delete',
        'json': {
          'id': 1
        }
      };

      request(options, function(err, res, body) {
        db.Post.findById({
          where: { id: 1 }
        }).then(function(results) {
          expect(results).to.equal(undefined);
          done();
        })
      });
    });
  });

  xdescribe('Tagging:', function() {

   
    xit('Retrieves all created tags for frontend render', function(done) {

    });

    xit('Adds correct tags to post', function(done) {

    });

    xit('Deletes tag from post in database when user removes tag', function(done) {

    });
  });

  xdescribe('Categories:', function() {
    
    xit('Correctly adds category to post', function(done) {

    });

    xit('Can add brand new category', function(done) {

    });
  });

  describe('Ranking:', function() {
    db.Post.create({
      problem_statement: 'not enough black turtlenecks',
      resource: 'http://www.turtlenecksgalore.com',
      vote_count: 0
    });

    it('Adds one to vote count when user upvotes post', function(done) {
      db.Post.find({
        where: { problem_statement: 'not enough black turtlenecks' }
      }).then(function(results) {
        // console.log(results);
        var options = {
          'method': 'POST',
          'uri': 'http://127.0.0.1:4568/api/upvote',
          'json': {
            'id': results.dataValues.id
          }
        };
        request(options, function(err, res, body) {
          db.Post.find({
            where: { problem_statement: 'not enough black turtlenecks' }
          }).then(function(posts) {
            expect(posts.dataValues.vote_count).to.equal(1);
            done();
          });
        });
      });
    });

    it('Subtracts one from vote count when user downvotes post', function(done) {
      db.Post.find({
        where: { problem_statement: 'not enough black turtlenecks' }
      }).then(function(results) {
        // console.log(results);
        var options = {
          'method': 'POST',
          'uri': 'http://127.0.0.1:4568/api/downvote',
          'json': {
            'id': results.dataValues.id
          }
        };
        request(options, function(err, res, body) {
          db.Post.find({
            where: { problem_statement: 'not enough black turtlenecks' }
          }).then(function(posts) {
            expect(posts.dataValues.vote_count).to.equal(0);
            done();
          });
        });
      });
    });

    it('Decrements vote count even when vote is zero or negative', function(done) {
      db.Post.find({
        where: { problem_statement: 'not enough black turtlenecks' }
      }).then(function(results) {
        // console.log(results);
        var options = {
          'method': 'POST',
          'uri': 'http://127.0.0.1:4568/api/downvote',
          'json': {
            'id': results.dataValues.id
          }
        };
        request(options, function(err, res, body) {
          db.Post.find({
            where: { problem_statement: 'not enough black turtlenecks' }
          }).then(function(posts) {
            expect(posts.dataValues.vote_count).to.equal(-1);
            done();
          });
        });
      });
    });
  });
})
