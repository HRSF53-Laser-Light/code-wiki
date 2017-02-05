var mysql = require('mysql');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('wiki', 'root', '');

var User = sequelize.define('user', {
  username: {type: Sequelize.STRING, unique: true},
  password: Sequelize.STRING
});

var Tag = sequelize.define('tag', {
  tag: {type: Sequelize.STRING, unique: false}
});

var Post = sequelize.define('post', {
  comment: Sequelize.STRING,
  link_url: Sequelize.STRING,
  link_description: Sequelize.STRING,
  link_image: Sequelize.STRING,
  link_title: Sequelize.STRING,
  vote_count: Sequelize.INTEGER
});

var Category = sequelize.define('category', {
  name: {type: Sequelize.STRING, unique: false}
});

var CategoryPosts = Category.hasMany(Post);
var PostCategory = Post.belongsTo(Category);
var PostTags = Post.belongsToMany(Tag, {through: 'tagpost'});
var TagPosts = Tag.belongsToMany(Post, {through: 'tagpost'});

sequelize.sync();

module.exports.User = User;
module.exports.Tag = Tag;
module.exports.Post = Post;
module.exports.Category = Category;

module.exports.CategoryPosts = CategoryPosts;
module.exports.PostCategory = PostCategory;
module.exports.PostTags = PostTags;
module.exports.TagPosts = TagPosts;






