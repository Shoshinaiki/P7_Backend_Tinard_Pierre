module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define(
      "Post",
      {
        // Model attributes are defined here
        postId: { 
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
    Post.associate = function associate(models) {
      Post.belongsTo(models.User, {
        as: 'author',
        foreignKey: {
          name: 'authorId',
          allowNull: false,
        },
      });
  };
    return Post;
  };