var router = require('express').Router();
var controller = require('./controller');

// Routes for signup
// router.get('/signup', controller.signup.get); // serve signup page
// router.post('/signup', controller.signup.post); // add a new user to the db

// Routes for signin
// router.get('/signin', controller.signin.get); // serve signin page
// router.post('/signin', controller.signin.post);

// Routes for homepage content
// router.get('/', function(req, res) {
//   res.send('this is the homepage');
// });

// Routes for resource posts
router.get('/posts', controller.posts.get);

router.get('/delete', function(req, res) {
  res.send('this deletes things');
}); // delete a post from the db

// Route for upvoting and downvoting
// router.post('/rank', controller.rank.post);

// // Routes for tagging 
// router.post('/tag', controller.tag.post);

module.exports = router;
