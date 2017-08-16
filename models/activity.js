//requires
const db = require('./db');
const Sequelize = db.Sequelize;

//model definition
const Activity = db.define('activity', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  age_range: {
    type: Sequelize.STRING,
    allowNull: false
  }
});


//export
module.exports = Activity;
