var express = require('express');
var parser = require('body-parser');
var session = require('express-session');
var path = require('path');

var db = require('../db/schema');
var router = require('./routes');

var app = express();

// middleware - parse JSON
app.use(parser.json());

// middleware - parse forms
app.use(parser.urlencoded({ extended: true }));

// set up authentication session
app.use(session({
  secret: 'saucecat',
  resave: false,
  saveUnitialized: true,
  cookie: {
    secure: true, 
    maxAge: 3600000 
  }
}));

// routing
app.use('', router);

// serve static client-facing files
app.use(express.static(path.resolve(__dirname, '../public')));

// spin up server
app.listen('3000', function() {
  console.log('Listening like a boss on port 3000');
});

// export app
module.exports = app;
