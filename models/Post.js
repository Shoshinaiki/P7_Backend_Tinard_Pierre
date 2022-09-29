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
    author: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    like: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    // usersLiked: {
    //   type: Sequelize.ARRAY(Sequelize.INTEGER),
    //   defaultValue: [],
    // }
  });
  return Post;
};
