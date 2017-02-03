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

// routing
app.use('', router);

// serve static client-facing files
app.use(express.static(path.resolve(__dirname, '../public')));

// set up authentication session
app.use(session({
  secret: 'saucefi3ld2o8',
  resave: false,
  saveUnitialized: true
}))

// spin up server
app.listen('3000', function() {
  console.log('Listening like a boss on port 3000');
});

// export app
module.exports = app;
