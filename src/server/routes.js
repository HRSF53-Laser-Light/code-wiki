var router = require('express').Router();
var controller = require('./controller');


/** SIGN UP, SIGN IN, SIGN OUT **/

// Route for signup
router.post('/api/signup', controller.signup.post);

// Route for signin
router.post('/api/signin', controller.signin.post);

// Route for signout
router.post('/api/signout', controller.signout.post);



/** LOADING COMPONENTS ON HOMEPAGE **/

// Route for getting posts in db
router.get('/api/posts', controller.posts.get);

// Route for collecting tags in db
router.get('/api/tags', controller.tags.get);

// Route for collecting categories in db
router.get('/api/categories', controller.categories.get);



/** USER ACTIONS ON POST **/

// Route for submitting a new post
router.post('/api/submit', controller.submit.post);

// Route for deleting a post
router.post('/api/delete', controller.delete.post);

// Route for upvoting a post
router.post('/api/upvote', controller.upvote.post);

// Route for downvoting a post
router.post('/api/downvote', controller.downvote.post);



module.exports = router;
