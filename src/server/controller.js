var db = require('../db/schema');

module.exports = {
  users: {
    get: function(req, res) {
      // db.Users.findAll()
      //   .then(function(users) {
      //     res.json(users);
      //   });
    },
    post: function(req, res) {
      // db.Users.findOrCreate({where: {username: req.body.username}})
      //   .spread(function(user, created) {
      //     res.sendStatus(created ? 201 : 200);
      //   });
    }
  },
  posts: {
    get: function(req, res) {
      console.log('in the posts get function');
      res.send('hello world');

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
    }
  },
  tags: {
    post: function(req, res) {

    }
  }
};