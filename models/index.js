//requires
const db = require('./db')
// const Sequelize = require('sequelize');
const Place = require('./place')
const Hotel = require('./hotel')
const Restaurant = require('./restaurant')
const Activity = require('./activity')

//Associations
Hotel.belongsTo(Place);
Activity.belongsTo(Place);
Restaurant.belongsTo(Place);
Place.hasMany(Activity);
Place.hasMany(Hotel);
Place.hasMany(Restaurant);

//sync and seed
// const sync = () => {
//   return db.sync({ force: true });
// };

// const seed = () => {
//   return require('./seed')
// }

module.exports = db;

