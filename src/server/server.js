var express = require('express');
var db = require('../db/schema');

var app = express();

// middleware
var parser = require('body-parser');

// routing
var router = require('./routes');
app.use('/', router); // what is the base thing that we're adding endpoints to?

// serve static client-facing files
app.use(express.static(__dirname + '/src/public/index'));

// spin up server
app.listen('3000', function() {
  console.log('Listening like a boss on port 3000');
});

// export app
module.exports.app = app;