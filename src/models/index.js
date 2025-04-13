'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const moment = require('moment');

// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];

const db = {};
let sequelize;
const connectDB = require('../db/connect');
sequelize = connectDB();

//commonfield
const commonFields = {
  created_by: {
    type: Sequelize.DataTypes.UUID,
  },
  updated_by: {
    type: Sequelize.DataTypes.UUID,
  },
  createdAt: {
    type: 'TIMESTAMP',
    defaultValue: () => {
      return moment().format('YYYY-MM-DD HH:mm:ss'); // Set default value with Singapore timezone
    },
    allowNull: false,
  },
  updatedAt: {
    type: Sequelize.DataTypes.DATE, // Use DataTypes.DATE instead of DataTypes.TIMESTAMP
    defaultValue: null, // Set default value to null
    allowNull: true, // Allow null values
  },
  deletedAt: {
    type: Sequelize.DATE,
    allowNull: true,
    defaultValue: null,
  },
};
sequelize.addHook('beforeDefine', (attributes, options) => {
  Object.assign(attributes, commonFields);
  options.timestamps = true;
  //deleted_at
  options.paranoid = true;
  options.updatedAt = true;
});
sequelize.addHook('beforeUpdate', (model, options) => {
  if (options.context && Object.keys(options.context).length > 0) {
    const userId = options.context.user.userID; // Replace with the actual user ID or fetch it dynamically
    model.updated_by = userId;
    model.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');

    // model.updatedAt = new Date(); // Update updatedAt only on update
  }
});

sequelize.addHook('beforeCreate', (model, options) => {
  console.log(options);
  if (options.context && Object.keys(options.context).length > 0) {
    console.log(options.context);
    const userId = options.context.user.userID; // Replace with the actual user ID or fetch it dynamically
    model.created_by = userId;
    model.updatedAt = null; // Update updatedAt only on update
    model.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');

    // model.updated_by = userId;
  }
});
sequelize.addHook('beforeDestroy', (model, options) => {
  console.log('deletion---------------', options);
});

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
