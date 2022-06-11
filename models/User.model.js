module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      // Model attributes are defined here
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        // allowNull defaults to true
      },
      email: {
        type: DataTypes.STRING,
        unique: true, // email doit être unique
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      superUser: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
        allowNull: false,
      },
    },
    {
      // Other model options go here
    }
  );
  return User;
};
