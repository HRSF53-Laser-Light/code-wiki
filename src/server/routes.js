var router = require('express').Router();
var controller = require('./controller');


/** SIGN UP, SIGN IN, SIGN OUT **/

// Routes for signup, signin, and signout
router.post('/api/signup', controller.signup.post);

router.post('/api/signin', controller.signin.post);

router.post('/api/signout', controller.signout.post);



/** LOADING COMPONENTS ON HOMEPAGE **/

// Routes for getting posts, tags, and categories in db
router.get('/api/posts', controller.posts.get);

router.get('/api/tags', controller.tags.get);

router.get('/api/categories', controller.categories.get);



/** USER ACTIONS ON POST **/

// Routes for submitting a new post, deleting a post, upvoting a post, and downvoting a post
router.post('/api/submit', controller.submit.post);

router.post('/api/delete', controller.delete.post);

router.post('/api/upvote', controller.upvote.post);

router.post('/api/downvote', controller.downvote.post);



module.exports = router;
