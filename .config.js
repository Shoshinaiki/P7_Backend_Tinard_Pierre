const sequelize = new Sequelize('groupomania_internal_network', 'Shoshinaiki', 'Misscri@1966', {
  host: 'localhost',
  dialect: 'mysql'
});

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
