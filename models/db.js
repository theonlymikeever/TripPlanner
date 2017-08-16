const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/tripplanner_db');
// const db = new

//export
module.exports = db;
