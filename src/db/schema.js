var mysql = require('mysql');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('wiki', 'root', '');

var Users = sequelize.define('Users', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

var Tags = sequelize.define('Tags', {
  tag: Sequelize.STRING
});

var Posts = sequelize.define('Posts', {
  problem_statement: Sequelize.STRING,
  resource: Sequelize.STRING,
  vote_count: Sequelize.INTEGER
});

var Category = sequelize.define('Category', {
  name: Sequelize.STRING
});

Category.hasMany(Posts);
Tags.belongsToMany(Posts, { through: 'Tags-Posts' });
Posts.belongsToMany(Tags, { through: 'Tags-Posts' });

Users.sync();
Tags.sync();
Posts.sync();
Category.sync();

module.exports.Users = Users;
module.exports.Tags = Tags;
module.exports.Posts = Posts;
module.exports.Category = Category;
