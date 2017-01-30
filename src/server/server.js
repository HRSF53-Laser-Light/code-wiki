var express = require('express');
var db = require('../db/schema');
var path = require('path');

var app = express();

// middleware - parsing
var parser = require('body-parser');
app.use(parser.json());

// routing
var router = require('./routes');
app.use('', router);

// serve static client-facing files
app.use(express.static(path.resolve(__dirname, '../public')));

// spin up server
app.listen('3000', function() {
  console.log('Listening like a boss on port 3000');
});

// export app
module.exports.app = app;
