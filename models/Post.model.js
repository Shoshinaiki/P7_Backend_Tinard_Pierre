module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define(
      "Post",
      {
        // Model attributes are defined here
        idPrimarykey: {
          type: DataTypes.INTEGER,
        },
        text: {
          type: DataTypes.STRING,
          // allowNull defaults to true
        },
        imageUrl: {
          type: DataTypes.STRING,
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
    return Post;
  };