var db = require('../db/schema');

module.exports = {
  signup: {
    post: function(req, res) {
      // hash password supplied by user
      // post username and hashed password to database
      // set up session

      // res.send('controller signup.post');
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
  posts: {
    get: function(req, res) {
      // retrieve all posts in posts table
      // filter to latest 10 results

      // res.send('controller posts.get');
    }
  },
  tags: {
    get: function(req, res) {
      // retrieve all tags from tags table

      // res.send('controller tags.post');
    }
  },
  categories: {
    get: function(req, res) {
      // retrieve all categories from categories table

      // res.send('controller categories.get');
    }
  },
  submit: {
    post: function(req, res) {
      // add a newly created post to the posts table
        // link, comment, tags, category
        // initialize votes to 0

      // res.send('controller submit.post');
    }
  },
  delete: {
    post: function(req, res) {
      // remove post from posts table

      // res.send('controller delete.post');
    }
  },
  upvote: {
    post: function(req, res) {
      // increment 'votes' on post in posts table

      // res.send('controller upvote.post');
    }
  },
  downvote: {
    post: function(req, res) {
      // decrement 'votes' on post in posts table

      // res.send('controller downvote.post');
    }
  }
};