var db = require('../db/schema');
var helpers = require('./helpers');
var bcrypt = require('bcrypt');
var request = require('request');
var Promise = require('bluebird');
var saltRounds = 10;

module.exports = {
  signup: {
    post: function(req, res) {
      // Check database for username
      db.User.findAll({
        where: { username: req.body.username }
      })
        .then(function(users) {
          // If username is free
          if (users.length === 0) {
            // Hash password
            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
              if (err) {
                console.log('Error hashing password', err);
              } else {
                // Add username and hashed pw to database
                db.User.create({
                  username: req.body.username,
                  password: hash
                })
                  .then(function() {
                    // Set up session?
                    res.redirect('/');
                  });
              }
            })
          // Username is already in database
          } else {   
            bcrypt.compare(req.body.password, users[0].dataValues.password, function(err, comparison) {
              if (err) {
                console.log('Error in comparison', err);
              } else {
                if (comparison === true) {
                  console.log('Looks like you already have an account. Please sign in.');
                  res.redirect('/api/signin');
                } else {
                  console.log('That username is already taken. Please choose another one.');
                  res.redirect('/api/signup');
                }
              }
            });
          }
        })
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
      // var comment = req.body.comment;
      // var category = req.body.category;
      // var tags = req.body.tags;
      // var link_url;
      // var link_description;
      // var link_image;
      // var link_title;

      var comment = 'this is my comment';
      var category = 'React';
      var tags = 'tutorial';
      var link_url = 'https://www.google.com';
      var link_description = 'this is some description';
      var link_image = 'some image';
      var link_title = 'a link title';

      // Parse out any links within the comment
      if (helpers.findUrls(comment).length > 0) {
        link_url = helpers.findUrls(comment)[0];
      }

      // Store everything in the database
      // db.Category.create({
      //   name: category
      // })
      // .then(function(category) {
      //   return category.createPost({
      //     comment: comment,
      //     link_url: link_url,
      //     link_description: link_description,
      //     link_image: link_image,
      //     link_title: link_title,
      //     vote_count: 0
      //   })
      // })
      // .then(function(post) {
      //   post.createTag({tag: tags});
      // })


      // db.Category.create({
      //   name: category
      // })
      // .then(function(category) {        
      //   return db.Post.create({
      //     comment: comment,
      //     link_url: link_url,
      //     link_description: link_description,
      //     link_image: link_image,
      //     link_title: link_title,
      //     vote_count: 0,
      //     categoryId: category.dataValues.id
      //   })
      // })
      // .then(function(post) {
      //   return db.Tag.create({
      //     tag: tags
      //   })
      // })
      // .then(function(tag, post) {
      //   console.log('post ' + post);
      // });

      var scrape = function(target) {
        return helpers.externalRequest.linkPreview(target)
          .then(function(metaData) {
            if (metaData) {
              link_url = metaData.url;
              link_description = metaData.description;
              link_image = metaData.image;
              link_title = metaData.title;

            // TODO: deal with situation where there is no link in comment
            } else {

            }
          })
      }
      // scrape(link_url);

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

