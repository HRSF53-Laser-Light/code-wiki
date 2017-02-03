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


var seedCategories = ['Angular', 'React', 'Databases', 'Express'];

// var promises = [];

//   for(var i = 0; i < seedCategories.length; i++) {
//     var newPromise = Category.create({
//       name: seedCategories[i]
//     });
//     promises.push(newPromise);
//   }
  
//   Promise.all(promises).then( function(result) {
//     console.log(result);
//     sequelize.close();
//     console.log('done'); 
//   });

  // promises.then(function(newCategories) {
  //   sequelize.close();
  //   console.log('done');
  // });


  // for(var i = 0; i < seedCategories.length; i++) {
  //   db.Category.create({
  //     name: seedCategories[i]
  //    });
  // }