module.exports = (sequelize, Sequelize) => {
    const PostHasLike = sequelize.define("PostHasLike", {
      // Model attributes are defined here
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      like: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      userLiked: {
        type: Sequelize.STRING,
        defaultValue: ""
      }
    });
    return PostHasLike;
  };
  