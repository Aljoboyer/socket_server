const Sequelize = require("sequelize");
require('dotenv').config();

const connectDB = () => {
  return new Sequelize('socket_db', 'root', 'Tanvir1233', {
    host: '127.0.0.1',
    logging: false,
    dialect: 'mysql'
  })
}

module.exports = connectDB
