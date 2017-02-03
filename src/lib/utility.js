var isLoggedIn = function(req) {
  return req.session ? !!req.session.user : false;
};

module.exports.checkUser = function(req, res, next){
  if (!isLoggedIn(req)) {
    // User must be redirected to signin page
    res.sendStatus(401);
  } else {
    next();
  }
};

module.exports.createSession = function(req, res, newUser) {
  return req.session.regenerate(function() {
      req.session.user = newUser;
      // Send 201: Created status and new user's username back to client
      res.send(201, { username: newUser.dataValues.username });
    });
};