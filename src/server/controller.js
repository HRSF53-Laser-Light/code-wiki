var db = require('../db/schema');
var util = require('../lib/utility');
var helpers = require('./helpers');

var bcrypt = require('bcrypt');
var request = require('request');
var Promise = require('bluebird');

var saltRounds = 10;

module.exports = {
  // Sign up new user
  signup: {
    post: function(req, res) {
      var username = req.body.username;
      var password = req.body.password;

      // If username or password left blank, send back 400: Bad request
      if (username === '' || password === '') {
        res.sendStatus(400);

      } else {
        // Check database for supplied username
        db.User.findAll({
          where: { username: username }
        })
        .then(function(users) {

          // Username is free; hash password
          if (users.length === 0) {
            bcrypt.hash(password, saltRounds, function(err, hash) {
              if (err) {
                console.log('Error hashing password', err);
              } else {

                // Add new user to database
                db.User.create({
                  username: username,
                  password: hash
                })

                // Create session and send back 201: Created code
                .then(function(user) {
                  util.createSession(req, res, user);
                });
              }
            });

          // Username is already in db; compare supplied password to pw in db
          } else {
            bcrypt.compare(password, users[0].dataValues.password, function(err, comparison) {
              if (err) {
                console.log('Error in password comparison', err);
              }

              // Supplied password matches, user already has account; send to Signin page
              if (comparison === true) {
                res.sendStatus(204);

              // Supplied pw doesn't match; probably new user & should choose another username
              } else {
                res.sendStatus(401);
              }
            });
          }
        });
      }
    }
  },
  // Sign in user
  signin: {
    post: function(req, res) {
      var username = req.body.username;
      var password = req.body.password;
      
      // Check database for username
      db.User.findAll({
        where: { username: username }
      })
      .then(function(users) {
        // If username is not in database, send back 401 code
        if (users.length === 0) {
          res.sendStatus(401);

        // If username is in database, compare supplied password with stored password
        } else {   
          bcrypt.compare(password, users[0].dataValues.password, function(err, comparison) {
            if (err) {
              console.log('Error in comparison', err);
            }

            // Passwords match; create session
            if (comparison === true) {
              util.createSession(req, res, users[0]);

            // Passwords don't match; send 401: Unauthorized status
            } else {
              res.sendStatus(401);
            }
          });
        }
      })
    }
  },

  // Sign out user
  signout: {
    post: function(req, res) {
      req.session.destroy(function() {
        res.sendStatus(200);
      });
    }
  },

  // Retrieve 10 most recent posts in Posts table
  posts: {
    get: function(req, res) {
      db.Post.findAndCountAll({
        order: [['createdAt', 'DESC']],
        limit: 10
      })
        .then(function(posts) {
          res.json(posts);
        });
    }
  },

  // Retrieve all tags in Tags table
  tags: {
    get: function(req, res) {
      db.Tag.findAll()
        .then(function(tags) {
          res.json(tags);
        });
    }
  },

  // Retrieve all categories in Categories table
  categories: {
    get: function(req, res) {
      db.Category.findAll()
        .then(function(categories) {
          res.json(categories);
        });
    }
  },

  // Add a new post to database
  submit: {
    post: function(req, res) {

      // Parse out any links within the comment
      if (helpers.findUrls(req.body.comment).length > 0) {
        var link_url = helpers.findUrls(req.body.comment)[0];
      } else {
        link_url = null;
      }

      // Separate tags into an array
      var tags = helpers.separateTags(req.body.tags);

      // First scrape for meta data with link from comment
      helpers.externalRequest.linkPreview(link_url)
        .then(function(metaData) {
          // Store post in database with the link's metadata
          if (metaData) {
            metaData = JSON.parse(metaData);
            db.Post.create({
              comment: req.body.comment,
              link_url: metaData.url,
              link_description: metaData.description,
              link_image: metaData.image,
              link_title: metaData.title,
              vote_count: 0,
              category: {name: req.body.category},
              tags: tags
            }, {
              include: [
              {association: db.PostCategory},
              {association: db.PostTags}
              ]
            });
          // Store post in database when there is no link or metadata returned
          } else {
            db.Post.create({
              comment: req.body.comment,
              vote_count: 0,
              category: {name: req.body.category},
              tags: tags
            }, {
              include: [
              {association: db.PostCategory},
              {association: db.PostTags}
              ]
            });
          }
        })
        .then(function(err) {
          if (err) {throw err;}
          res.sendStatus(201);
        });
    }
  },

  // Delete post from database
  delete: {
    post: function(req, res) {
      db.Post.destroy({
        where: { id: req.body.id },
        limit: 1
      })
        .then(function(result) {
          res.sendStatus(200);
        });
    }
  },

  // Increment vote count on post
  upvote: {
    post: function(req, res) {
      db.Post.findOne({
        where: { id: req.body.id },
      })
        .then(function(result) {
          result.increment('vote_count');
          res.sendStatus(200);
        });
    }
  },

  // Decrement vote count on post
  // Note: can decrement counts <= 0
  downvote: {
    post: function(req, res) {
      db.Post.findOne({
        where: { id: req.body.id },
      })
        .then(function(result) {
          result.decrement('vote_count');
          res.sendStatus(200);
        });
    }
  }
};





// OLD POST LOOKUP FUNCTIONALITY

// db.Post.findOne({
//   where: {
//     problem_statement: req.body.problem,
//     resource: req.body.resource
//   }
// })
//   .then(function(results) {
//     // Message if exact post has already been made
//     if (results !== null) {
//       console.log('Your message has already been posted');
//     // Create new post
//     } else {
//       db.Category.findOne({
//         where: { name: req.body.category }
//       })
//         .then(function(results) {
//           /**** TO DO: createdAt, updatedAt, CategoryId ****/
//           db.Post.create({
//             problem_statement: req.body.problem,
//             resource: req.body.resource,
//             vote_count: 0,
//             CategoryId: results.dataValues.id
//           })
//             .then(function() {
//               res.sendStatus(201);
//             });
//         })
//     }
//   })
