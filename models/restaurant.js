//requires
const db = require('./db');
const Sequelize = db.Sequelize;

//model definition
const Restaurant = db.define('restaurant', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cuisine: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

//export
module.exports = Restaurant;
