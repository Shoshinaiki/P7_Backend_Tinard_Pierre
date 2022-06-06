'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const groupomania_internal_network = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.groupomania_internal_network, config.Shoshinaiki, config.password = "Misscri@1966", config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    groupomania_internal_network[model.name] = model;
  });

Object.keys(groupomania_internal_network).forEach(modelName => {
  if (groupomania_internal_network[modelName].associate) {
    groupomania_internal_network[modelName].associate(groupomania_internal_network);
  }
});

groupomania_internal_network.sequelize = sequelize;
groupomania_internal_network.Sequelize = Sequelize;

module.exports = groupomania_internal_network;
