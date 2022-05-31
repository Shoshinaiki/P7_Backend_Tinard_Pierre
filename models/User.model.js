module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      // Model attributes are defined here
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        // allowNull defaults to true
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING
      },
      superUser: {
          type: DataTypes.BOOLEAN,
      }
    },
    {
      // Other model options go here
    }
  );
  return User;
};
