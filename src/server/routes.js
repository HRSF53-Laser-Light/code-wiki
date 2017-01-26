var router = require('express').Router();
var controller = require('./controller');

// Define routes for sign up, sign in
// router.get('/signup', ); // serve signup page
router.post('/signup', controller.users.post);
// router.get('/signin', ); // serve signin page
router.post('/signin', controller.users.post);

// Define routes for home and posts to home
router.get('/', controller.get.post); // serve static content, check authentication
router.post('/', controller.posts.post);
// more for tags?

module.exports = router;
