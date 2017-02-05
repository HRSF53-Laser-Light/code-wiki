var express = require('express');
var parser = require('body-parser');
var mysql = require('mysql');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var path = require('path');

var db = require('../db/schema');
var router = require('./routes');

var app = express();

// middleware - parse JSON
app.use(parser.json());

// middleware - parse forms
app.use(parser.urlencoded({ extended: true }));

var options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'wiki'
};

var connection = mysql.createConnection(options); // or mysql.createPool(options); 
var sessionStore = new MySQLStore({}/* session store options */, connection);

// set up authentication session
app.use(session({
  key: 'app.sess',
  secret: 'saucecat',
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
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
