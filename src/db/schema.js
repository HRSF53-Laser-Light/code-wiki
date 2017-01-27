var mysql = require('mysql');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('wiki', 'root', '');

var User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

var Tag = sequelize.define('tag', {
  tag: Sequelize.STRING
});

var Post = sequelize.define('post', {
  problem_statement: Sequelize.STRING,
  resource: Sequelize.STRING,
  vote_count: Sequelize.INTEGER
});

var Category = sequelize.define('category', {
  name: Sequelize.STRING
});

Category.hasMany(Post);
Post.belongsToMany(Tag, {through: 'tagpost'});
Tag.belongsToMany(Post, {through: 'tagpost'});

sequelize.sync();

module.exports.User = User;
module.exports.Tag = Tag;
module.exports.Post = Post;
module.exports.Category = Category;


