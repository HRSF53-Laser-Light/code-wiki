var isLoggedIn = function(req) {
  return req.session ? !!req.session.user : false;
};

module.exports.checkUser = function(req, res, next){
  if (!isLoggedIn(req)) {
    res.redirect('/signin');
  } else {
    next();
  }
};

module.exports.createSession = function(req, res, newUser) {
  return req.session.regenerate(function() {
      req.session.user = newUser;
      res.redirect('/');
    });
};