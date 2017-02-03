var db = require('../db/schema');
var util = require('../lib/utility');
var bcrypt = require('bcrypt');

var saltRounds = 10;

module.exports = {
  signup: {
    post: function(req, res) {
      var username = req.body.username;
      var password = req.body.password;

      // If username or password left blank, send back 400: Bad request
      if (username === '' || password === '') {
        res.write('')
        res.sendStatus(400);
      }

      // Check database for supplied username
      db.User.findAll({
        where: { username: username }
      })
      .then(function(results) {

        // Username is free; hash password
        if (results.length === 0) {
          bcrypt.hash(password, saltRounds, function(err, hash) {
            if (err) {
              console.log('Error hashing password', err);
            }

            // Add new user to database
            db.User.create({
              username: username,
              password: hash
            })

            // Create session and send back 201: Created status
            .then(function(user) {
              // create a session

              res.sendStatus(201);
            });
          })

        // Username is already in db; compare supplied password to pw in db
        } else {
          bcrypt.compare(password, results[0].dataValues.password, function(err, comparison) {
            if (err) {
              console.log('Error in password comparison', err);
            }

            // Supplied password matches; user already has account
            if (comparison === true) {
              // Message: 'Looks like you already have an account. Please sign in.'
              res.sendStatus(204);

            // Supplied pw doesn't match; probably new user & should choose another username
            } else {
              // Message: 'The username is already taken. Please choose another one.'
              res.sendStatus(409);
            }
          });
        }
      });
    }
  },
  signin: {
    post: function(req, res) {
      // Check database for username
      db.User.findAll({
        where: { username: req.body.username }
      })
        .then(function(users) {
          // Username is not in database
          if (users.length === 0) {
            console.log('There is no account with that username. Please try again.');
            res.redirect('/api/signin');
          // Username is in database
          } else {   
            bcrypt.compare(req.body.password, users[0].dataValues.password, function(err, comparison) {
              if (err) {
                console.log('Error in comparison', err);
              } else {
                // Passwords match
                if (comparison === true) {
                  res.redirect('/');
                // Passwords don't match
                } else {
                  console.log('Password does not match. Please try again.');
                  res.redirect('/api/signin');
                }
              }
            });
          }
        })
    }
  },

  // Sign out user
  signout: {
    post: function(req, res) {
      // Reset session?
      res.redirect('/api/signout');
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
      db.Post.findOne({
        where: {
          problem_statement: req.body.problem,
          resource: req.body.resource
        }
      })
        .then(function(results) {
          // Message if exact post has already been made
          if (results !== null) {
            console.log('Your message has already been posted');
          // Create new post
          } else {
            db.Category.findOne({
              where: { name: req.body.category }
            })
              .then(function(results) {
                /**** TODO: CategoryId and Tagpost ****/
                db.Post.create({
                  problem_statement: req.body.problem,
                  resource: req.body.resource,
                  vote_count: 0
                })
                  .then(function() {
                    res.sendStatus(201);
                  });
              })
          }
        })
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