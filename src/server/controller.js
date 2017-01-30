var db = require('../db/schema');
var bcrypt = require('bcrypt');

var _saltRounds = 10;

module.exports = {
  signup: {
    post: function(req, res) {
      // check if username already in database
        // if not, it is free
          // hash password supplied by user
          bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
            // Store hash in your password DB. 
            // post username and hashed password to db
          });
          // set up session
          // direct to homepage

        // if yes, it is already taken
          // prompt to choose different username
          // redirect to signup page again
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
  // Retrieve latest 10 posts in Posts table
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
  // Insert a newly created post into Posts table
  submit: {
    post: function(req, res) {
        // link, comment, tags, category
        // initialize votes to 0
    }
  },
  // Delete post from Posts table
  delete: {
    post: function(req, res) {
      db.Post.destroy({
        where: { id: req.body.id },
        limit: 1
      })
        .then(function(results) {
          res.sendStatus(200);
        });
    }
  },
  // Increment vote count on post in Posts table
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
  // Deccrement vote count on post in Posts table
  // Note: decrementing is allowed even on 0 and negative numbers
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