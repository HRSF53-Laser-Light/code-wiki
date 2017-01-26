var router = require('express').Router();
var controller = require('./controller');

// Routes for signup
router.get('/signup', controller.users.get); // serve signup page
router.post('/signup', controller.users.post); // add a new user to the db

// Routes for signin
router.get('/signin', controller.users.get); // serve signin page
router.post('/signin', controller.users.post);

// Routes for getting homepage resource content
router.get('/', controller.posts.get);

// Routes for resource posts
router.post('/post', controller.posts.post);
// router.post('/delete', controller.delete.post); // delete a post from the db

// Route for upvoting and downvoting
router.post('/rank', controller.rank.post);

// Routes for tagging 
router.post('/tag', controller.tag.post);

module.exports = router;
