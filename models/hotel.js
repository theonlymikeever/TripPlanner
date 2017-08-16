//requires
const db = require('./db');
const Sequelize = db.Sequelize;

//model definition
const Hotel = db.define('hotel', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  num_stars: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  amenities: {
    type: Sequelize.STRING,
    allowNull: false
  }
});


//export
module.exports = Hotel;
