var router = require('express').Router();
var controller = require('./controller');


/** SIGN UP, SIGN IN, SIGN OUT **/

// Route for signup
router.post('/signup', controller.signup.post); // add a new user to the db

// Route for signin
router.post('/signin', controller.signin.post);

// Route for signout
router.post('/signout', controller.signout.post);



/** LOADING COMPONENTS ON HOMEPAGE **/

// Route for getting posts in db
router.get('/posts', controller.posts.get);

// Route for collecting tags in db
router.get('/tags', controller.tags.get);

// Route for collecting categories in db
router.get('/categories', controller.categories.get);



/** USER ACTIONS ON POST **/

// Route for submitting a new post
router.post('/submit', controller.submit.post); // delete a post from the db

// Route for deleting a post
router.post('/delete', controller.delete.post); // delete a post from the db

// Route for upvoting a post
router.post('/upvote', controller.upvote.post);

// Route for downvoting a post
router.post('/downvote', controller.downvote.post);



module.exports = router;
