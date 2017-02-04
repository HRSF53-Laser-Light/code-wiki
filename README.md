# Installation #

Fork and then clone this repo to your local development environment. Check to see if MySQL is installed:

  type -a mysql

Once MySQL is installed, start up your MySQL server:

  mysql.server start

Create a new database called "wiki":

  mysql -u root -p

When prompted for a password, just click 'enter'.

  create database wiki;
  quit;

Install application dependencies.  

  npm install

Start up a server on port 3000.

  npm start