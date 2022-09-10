module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("Post", {
    // Model attributes are defined here
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
    text: {
      type: Sequelize.STRING,
      // allowNull defaults to true
    },
    imageUrl: {
      type: Sequelize.STRING,
    },
    author: {
      type: Sequelize.STRING,
    },
  });
  return Post;
};
