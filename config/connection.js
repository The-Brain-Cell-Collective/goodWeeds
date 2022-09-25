const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;


if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    // ! Grayson has to use 127.0.0.1 ... DOUBLE-CHECK THAT YOURS IS SET TO LOCALHOST! 
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 3306,
  }
);
}

module.exports = sequelize;
