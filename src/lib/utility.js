var isLoggedIn = function(req) {
  console.log('isLoggedIn req', req);
  // console.log('isLoggedIn req', req);
  return req.session ? !!req.session.user : false;
};

module.exports.checkUser = function(req, res, next){
  // console.log('checkUser req is', req);
  if (!isLoggedIn(req)) {
    console.log('not logged in');
    // User must be redirected to Signin page
    res.sendStatus(401);
  } else {
    next();
  }
};

module.exports.createSession = function(req, res, newUser) {
  return req.session.regenerate(function() {
    req.session.user = newUser;
    console.log('req.session is', req.session)
    console.log('req.session.user', req.session.user);
    res.status(201).send({
      username: newUser.dataValues.username,
      userId: newUser.dataValues.id });
  });
};
