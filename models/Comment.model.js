module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      "Comment",
      {
        // Model attributes are defined here
        idPrimaryKey: {
          type: DataTypes.INTEGER,
        },
        text: {
          type: DataTypes.STRING,
          // allowNull defaults to true
        },
        author: {
          type: DataTypes.STRING
        },
        authorId: {
          type: DataTypes.INTEGER,
        },
        like: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        dislike: {
          type: DataTypes.STRING,
          // allowNull defaults to true
        },
        superUser: {
            type: DataTypes.BOOLEAN,
        }
      },
      {
        // Other model options go here
      }
    );
    return "Comment";
  };
  