module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("Comment", {
    // Model attributes are defined here
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: Sequelize.STRING,
      // allowNull defaults to true
    },
    author: {
      type: Sequelize.STRING,
    },
  });
  return Comment;
};
