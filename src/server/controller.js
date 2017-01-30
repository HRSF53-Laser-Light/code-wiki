var db = require('../db/schema');
var bcrypt = require('bcrypt');

var saltRounds = 10;

module.exports = {
  signup: {
    post: function(req, res) {
      // Check database for username
      db.User.findAll({
        where: { username: req.body.username }
      })
        .then(function(results) {
          // Username is free
          console.log('results are', results);
          if (results.length === 0) {
            // Hash password
            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
              if (err) {
                console.log('Error hashing password', err);
              // Add username and hashed pw to database
              } else {
                console.log('hash is', hash);
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
            console.log('username is already in database?');
            // bcrypt.compare(req.body.password, hash, function(err, res) {
            //   // Username is in database and password supplied matches its password --> already have an account
            //   if (res === true) {
            //     console.log('Looks like you already have an account. Sign in.')
            //     res.redirect('/api/signin');
            //   // Username is in database and password supplied doesn't match --> must choose a different username
            //   } else {
            //     console.log('That username is already taken. Please try another one.');
            //     res.redirect('/api/signup');
            //   }
            // });
          }
        })
    }
  },
  signin: {
    post: function(req, res) {
      // get username and password from db
        // if it's not there
          // redirect to signup pag
        // if it's there
          // bcrypt compare username and password from signin and from db
          // if they match
            // set up a session
          // if they don't match
            // send back to signin page and encourage to sign in again

      // res.send('controller signin.post');
    }
  },
  signout: {
    post: function(req, res) {
      // reset session

      // res.send('controller signout.post');
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
                /**** TO DO: createdAt, updatedAt, CategoryId ****/
                db.Post.create({
                  problem_statement: req.body.problem,
                  resource: req.body.resource,
                  vote_count: 0,
                  CategoryId: results.dataValues.id
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