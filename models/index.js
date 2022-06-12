const Sequelize = require("sequelize");
const dotenv = require("dotenv").config({ encoding: "latin1" });

let sequelize = new Sequelize(
  process.env.NAME,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql",
    logging: false,
  }
);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require("./User.model.js")(sequelize, Sequelize);
db.post = require("./Post.model.js")(sequelize, Sequelize);
db.comment = require("./Comment.model.js")(sequelize, Sequelize);

db.post.hasMany(db.comment, { onDelete: "CASCADE", hooks: true });
db.comment.belongsTo(db.post);

module.exports = db;
