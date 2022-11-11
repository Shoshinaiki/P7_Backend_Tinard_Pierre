module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("Post", {
    // Model attributes are defined here
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
    titre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    text: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: Sequelize.STRING,
    },
    user: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });
  return Post;
};
