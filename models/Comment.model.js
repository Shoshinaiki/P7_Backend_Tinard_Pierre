const DataTypes = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("Comment", {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    author: {
      type: DataTypes.STRING,
    },
  });
  return Comment;
};
