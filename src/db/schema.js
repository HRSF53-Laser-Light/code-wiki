var mysql = require('mysql');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('wiki', 'root', '');

exports.Users = sequelize.define('Users', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  salt: Sequelize.STRING
});

exports.Tags = sequelize.define('Tags', {
  tag: Sequelize.STRING
});

exports.Posts = sequelize.define('Posts', {
  problem_statement: Sequelize.STRING,
  resource: Sequelize.STRING,
  vote_count: Sequelize.INTEGER
})

exports.Category = sequelize.define('Category', {
  name: Sequelize.STRING
})

Category.hasMany(Posts);
Tags.belongsToMany(Posts, { through: 'Tags-Posts' });
Posts.belongsToMany(Tags, { through: 'Tags-Posts' });

Users.sync();
Tags.sync();
Posts.sync();
Category.sync();