var expect = require('chai').expect;
var request = require('request');
var bcrypt = require('bcrypt');
var Promise = require('bluebird');

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
  });

  after(function() {
    server.close();
  });


  xdescribe('Sign up:', function() {
    var j = request.jar()
    var requestWithSession = request.defaults({jar:j})

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

      requestWithSession(options, function(error, res, body) {
        // console.log('res headers', res.headers)
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

    it('Does not allow duplicate usernames', function(done) {
      var options = {
        'method': 'POST',
        'followAllRedirects': true,
        'uri': 'http://127.0.0.1:4568/api/signup',
        'json': {
          'username': 'sterlingarcher',
          'password': 'mawp'
        }
      };

      requestWithSession(options, function(err, res, body) {
        expect(res.statusCode).to.equal(401);
        done();
      });
    });

    it('Sends status that indicates that a previously stored user should sign in, not sign up', function(done) {
      var options = {
        'method': 'POST',
        'followAllRedirects': true,
        'uri': 'http://127.0.0.1:4568/api/signup',
        'json': {
          'username': 'sterlingarcher',
          'password': 'phrasing'
        }
      };

      requestWithSession(options, function(err, res, body) {
        expect(res.statusCode).to.equal(204);
        done();
      });
    });

    it('Adds a session to the database sessions table', function(done) {
      var options = {
        'method': 'POST',
        'followAllRedirects': true,
        'uri': 'http://127.0.0.1:4568/api/signup',
        'json': {
          'username': 'sterlingarcher',
          'password': 'phrasing'
        }
      };

      request(options, function(err, res, body) {
        var found = false;

        db.sequelize.query('select data from sessions').spread(function(results) {
          for (var key in results) {
            var row = JSON.parse(results[key].data);
            if (row.user && row.user.username === 'sterlingarcher') {
              found = true;
            }
          }
          expect(found).to.equal(true);
          done();
        });
      });
    });
  });

  xdescribe('Sign in:', function() {
    
    before(function(done) {
      db.User.destroy({
        where: {}
      });

      var options = {
        'method': 'POST',
        'url': 'http://127.0.0.1:4568/api/signup',
        'json': {
          'username': 'sterlingarcher',
          'password': 'phrasing'
        }
      };

      request(options, function(err, res, body) {
        done();
      });
    });

   
    it('Does not authenticate if stored username is entered but password does not match', function(done) {
      var options = {
        'method': 'POST',
        'uri': 'http://127.0.0.1:4568/api/signin',
        'json': {
          'username': 'sterlingarcher',
          'password': 'lana'
        }
      };

      request(options, function(err, res, body) {
        expect(res.statusCode).to.equal(401);
        done();
      });
    });

    it('Sends status so that frontend renders home page if correct username and password info entered', function(done) {
      var options = {
        'method': 'POST',
        'uri': 'http://127.0.0.1:4568/api/signin',
        'json': {
          'username': 'sterlingarcher',
          'password': 'phrasing'
        }
      }

      request(options, function(err, res, body) {
        expect(res.statusCode).to.equal(201);
        done();
      });
    });
  });


  xdescribe('Sign out:', function() {
    
    before(function(done) {
      var options = {
        'method': 'POST',
        'uri': 'http://127.0.0.1:4568/api/signin',
        'json': {
          'username': 'sterlingarcher',
          'password': 'phrasing'
        }
      };

      request(options, function(err, res, body) {
        done();
      });
    })


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

    it('Does not allow access to cookie-protected data after signout', function(done) {
      var options = {
        'method': 'GET',
        'url': 'http://127.0.0.1:4568/api/posts'
      };

      request(options, function(err, res, body) {
        expect(body).to.equal('Unauthorized');
        done();
      });
    });
  });

  describe('Posting:', function() {

    var cookie;

    before(function(done) {
      var options = {
        'method': 'POST',
        'followAllRedirects': true,
        'uri': 'http://127.0.0.1:4568/api/signin',
        'json': {
          'username': 'sterlingarcher',
          'password': 'phrasing'
        }
      };

      request(options, function(err, res, body) {
        var cookies = res.headers['set-cookie'];
        var results = cookies.filter((cookie) => { return cookie.includes('app.sess') });
        cookie = results[0];
        db.Post.destroy({
          where: {}
        });

        var posts = [];

        for (var i = 0; i < 25; i++) {
          posts.push(
            db.Post.create({
              comment: 'comment' + i,
              link_url: 'link' + i,
              link_description: 'desc' + i,
              link_image: 'img' + i,
              link_title: 'title' + i,
              vote_count: Math.random() * 100
            })
          );
        }

        Promise.all(posts).then(function(results) {
          done();
        })
      });
    });

    var requestWithSession = request.defaults({jar: true});
    
    it('Retrieves 20 posts from database', function(done) {
      // var options = {
      //   'method': 'POST',
      //   'uri': 'http://127.0.0.1:4568/api/signin',
      //   // 'headers': {
      //   //   'Cookie': cookie
      //   // },
      //   'json': {
      //     'username': 'sterlingarcher',
      //     'password': 'phrasing'
      //   }
      // };

      request.cookie(cookie);

      // requestWithSession(options, function(err, res, body) {
      //   expect(res.statusCode).to.equal(200);
      //   done();
      // })

      var options = {
        'method': 'GET',
        'url': 'http://127.0.0.1:4568/api/posts',
        'headers': {
          'Cookie': cookie
        }
      }

      requestWithSession(options, function(err, res, body) {
        expect(res.statusCode).to.equal(200);
        expect(JSON.parse(body).rows.length).to.equal(20);
        done();
      });
    });

    it('Does not add identical posts to database', function(done) {
      var options = {
        'method': 'POST',
        'uri': 'http://127.0.0.1:4568/api/submit',
        'json': {
          'comment': 'comment3',
          'link_url': 'link3'
        }
      };

      request(options, function(err, res, body) {
        done();
      })
    });

    it('Deletes post from database when user removes post', function(done) {
      db.Post.find({
        where: { comment: 'comment1' }
      })
      .then(function(results) {
        var options = {
          'method': 'POST',
          'uri': 'http://127.0.0.1:4568/api/delete',
          'json': {
            'id': results.dataValues.id
          },
          'headers': {
            'Cookie': cookie
          }
        };
        request(options, function(err, res, body) {
          db.Post.find({
            where: { id: results.dataValues.id }
          })
          .then(function(results) {
            expect(results).to.equal(null);
            done();
          })
        });
      });

    });
  });

  describe('Tagging:', function() {

    var cookie;

    before(function(done) {
      var options = {
        'method': 'POST',
        'followAllRedirects': true,
        'uri': 'http://127.0.0.1:4568/api/signin',
        'json': {
          'username': 'sterlingarcher',
          'password': 'phrasing'
        }
      };

      request(options, function(err, res, body) {
        var cookies = res.headers['set-cookie'];
        var results = cookies.filter((cookie) => { return cookie.includes('app.sess') });
        cookie = results[0];
      
        db.Tag.destroy({
          where: {}
        });

        var tags = ['lana', 'mother', 'weebabyseamus', 'mawp'];

        var results = [];

        for (var i = 0; i < tags.length; i++) {
          results.push(
            db.Tag.create({
              tag: tags[i]
            })
          );
        }

        Promise.all(results).then(function(results) {
          done();
        });
      });
    });
   
    it('Retrieves all tags for frontend render', function(done) {
      var options = {
        'method': 'GET',
        'url': 'http://127.0.0.1:4568/api/tags',
        'headers': {
          'Cookie': cookie
        }
      };

      request(options, function(err, res, body) {
        expect(JSON.parse(body).length).to.equal(4);
        done();
      });
    });
  });

  describe('Categories:', function() {

    var cookie;

    before(function(done) {
      var options = {
        'method': 'POST',
        'followAllRedirects': true,
        'uri': 'http://127.0.0.1:4568/api/signin',
        'json': {
          'username': 'sterlingarcher',
          'password': 'phrasing'
        }
      };

      request(options, function(err, res, body) {
        var cookies = res.headers['set-cookie'];
        var results = cookies.filter((cookie) => { return cookie.includes('app.sess') });
        cookie = results[0];

        db.Category.destroy({
          where: {}
        });

        db.Category.create({
          name: 'missions'
        });

        db.Category.create({
          name: 'lacrosse'
        });
        done();
      });
    });

    it('Retrieves all categories for frontend render', function(done) {
      var options = {
        'method': 'GET',
        'url': 'http://127.0.0.1:4568/api/categories',
        'headers': {
          'Cookie': cookie
        }
      }

      request(options, function(err, res, body) {
        expect(JSON.parse(body).length).to.equal(2);
        done();
      });
    });
  });

  xdescribe('Ranking:', function() {
    // var requestWithSession = request.defaults({jar: true});

    before(function() {
      db.Post.destroy({
        where: { comment: 'not enough black turtlenecks' }
      });

      db.Post.create({
        comment: 'my favorite black turtlenecks',
        link_url: 'http://www.turtlenecksgalore.com',
        link_description: 'turtlenecks up to your neck!',
        link_image: 'http://www.turtlenecks.com',
        link_title: 'turtlenecks galore',
        vote_count: 0
      });
    });

    it('Adds one to vote count when user upvotes post', function(done) {
      db.Post.find({
        where: { comment: 'my favorite black turtlenecks' }
      }).then(function(results) {
        var options = {
          'method': 'POST',
          'uri': 'http://127.0.0.1:4568/api/upvote',
          'json': {
            'id': results.dataValues.id
          }
        };
        request(options, function(err, res, body) {
          db.Post.find({
            where: { comment: 'my favorite black turtlenecks' }
          }).then(function(posts) {
            expect(posts.dataValues.vote_count).to.equal(1);
            done();
          });
        });
      });
    });

    it('Subtracts one from vote count when user downvotes post', function(done) {
      db.Post.find({
        where: { comment: 'my favorite black turtlenecks' }
      }).then(function(results) {
        var options = {
          'method': 'POST',
          'uri': 'http://127.0.0.1:4568/api/downvote',
          'json': {
            'id': results.dataValues.id
          }
        };
        request(options, function(err, res, body) {
          db.Post.find({
            where: { comment: 'my favorite black turtlenecks' }
          }).then(function(posts) {
            expect(posts.dataValues.vote_count).to.equal(0);
            done();
          });
        });
      });
    });

    it('Decrements vote count even when vote is zero or negative', function(done) {
      db.Post.find({
        where: { comment: 'my favorite black turtlenecks' }
      }).then(function(results) {
        var options = {
          'method': 'POST',
          'uri': 'http://127.0.0.1:4568/api/downvote',
          'json': {
            'id': results.dataValues.id
          }
        };
        request(options, function(err, res, body) {
          db.Post.find({
            where: { comment: 'my favorite black turtlenecks' }
          }).then(function(posts) {
            expect(posts.dataValues.vote_count).to.equal(-1);
            done();
          });
        });
      });
    });
  });
})
