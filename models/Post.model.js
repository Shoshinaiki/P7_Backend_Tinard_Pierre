const DataTypes = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("Post", {
    // Model attributes are defined here
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    author: {
      type: DataTypes.STRING,
    },
  });
  return Post;
};
