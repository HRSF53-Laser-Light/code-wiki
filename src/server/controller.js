var db = require('../db/schema');

module.exports = {
  users: {
    get: function(req, res) {
      // db.Users.findAll()
      //   .then(function(users) {
      //     res.json(users);
      //   });
      res.send('welcome to controller users.get');
    },
    post: function(req, res) {
      // db.Users.findOrCreate({where: {username: req.body.username}})
      //   .spread(function(user, created) {
      //     res.sendStatus(created ? 201 : 200);
      //   });
      res.send('welcome to controller users.post');
    }
  },
  posts: {
    get: function(req, res) {
      res.send('welcome to controller posts.get');
    },
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
      res.send('welcome to controller posts.post');
    }
  },
  tags: {
    post: function(req, res) {
      res.send('welcome to controller tags.post');
    }
  },
  delete: {
    post: function(req, res) {
      res.send('welcome to controller delete.post');
    }
  },
  signup: {
    get: function(req, res) {
      res.send('wecome to controller signup.get');
    }, 
    post: function(req, res) {
      res.send('wecome to controller signup.post');
    }
  },
  signout: {
    get: function(req, res) {
      res.send('wecome to controller signout.get');
    }, 
    post: function(req, res) {
      res.send('wecome to controller signout.post');
    }
  }
};