var router = require('express').Router();
var controller = require('./controller');
var util = require('../lib/utility');


/** SIGN UP, SIGN IN, SIGN OUT **/

// Routes for signup, signin, and signout
router.post('/api/signup', controller.signup.post);

router.post('/api/signin', controller.signin.post);

router.post('/api/signout', controller.signout.post);

router.get('/api/session', controller.session.get);

/** LOADING COMPONENTS ON HOMEPAGE **/

// Routes for getting posts, tags, and categories in db
router.get('/api/posts', util.checkUser, controller.posts.get);

router.get('/api/tags', util.checkUser, controller.tags.get);

router.get('/api/tagId', util.checkUser, controller.tagId.get);

router.get('/api/categories', util.checkUser, controller.categories.get);

router.get('/api/user*', util.checkUser, controller.users.get);

router.get('/api/tag*', util.checkUser, controller.tagName.get);

router.get('/api/category*', util.checkUser, controller.categoryName.get);



/** USER ACTIONS ON POST **/

// Routes for submitting a new post, deleting a post, upvoting a post, and downvoting a post
router.post('/api/submit', util.checkUser, controller.submit.post);

router.post('/api/delete', util.checkUser, controller.delete.post);

router.post('/api/upvote', util.checkUser, controller.upvote.post);

router.post('/api/downvote', util.checkUser, controller.downvote.post);



module.exports = router;
