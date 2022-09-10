module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
    // Model attributes are defined here
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    email: {
      type: Sequelize.STRING,
      unique: true, // email doit être unique
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    superUser: {
      type: Sequelize.BOOLEAN,
      defaultValue: 0,
      allowNull: false,
    },
  });
  return User;
};
