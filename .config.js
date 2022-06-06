const dotenv = require("dotenv").config();
const sequelize = new Sequelize('groupomania_internal_network', 'root', process.env.GROUPOMANIA_INTERNAL_NETWORK_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql'
});


try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
