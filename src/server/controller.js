var db = require('../db/schema');

module.exports = {
  signup: {
    post: function(req, res) {
      res.send('controller signup.post');
    }
  },
  signin: {
    post: function(req, res) {
      res.send('controller signin.post');
    }
  },
  signout: {
    post: function(req, res) {
      res.send('controller signout.post');
    }
  },
  posts: {
    get: function(req, res) {
      res.send('controller posts.get');
    }
  },
  tags: {
    get: function(req, res) {
      res.send('controller tags.post');
    }
  },
  categories: {
    get: function(req, res) {
      res.send('controller categories.get');
    }
  },
  submit: {
    post: function(req, res) {
      // db.Posts.findOrCreate({where: {username: req.body.username}})
      //   .spread(function(user, created) {
      //     db.Message.create({
      //       problem_statement: req.body.problem_statement,
      //       resource: req.body.resource,
      //       vote_count: 0
      //     }).then(function(post) {
      //       res.sendStatus(201);
      //     });
      //   });
      res.send('controller submit.post');
    }
  },
  delete: {
    post: function(req, res) {
      res.send('controller delete.post');
    }
  },
  upvote: {
    post: function(req, res) {
      res.send('controller upvote.post');
    }
  },
  downvote: {
    post: function(req, res) {
      res.send('controller downvote.post');
    }
  }
};