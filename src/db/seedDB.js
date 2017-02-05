var db = require('./schema');

var seedCategories = [
'Angular',
'React',
'MySQL',
'MongoDB',
'Sequelize',
'Express'
];

formatCategories = (array) => {
  for (var i = 0; i < array.length; i++) {
    array[i] = {name: array[i]};
  }
  return array;
}

// Format array in proper Sequelize format
seedCategories = formatCategories(seedCategories);

// Add seed categories to the database
db.Category.bulkCreate(seedCategories);
