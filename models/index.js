const Sequelize = require("sequelize");
const config = require("../config/db.config.js");

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require("./User.js")(sequelize, Sequelize);
db.post = require("./Post.js")(sequelize, Sequelize);
db.comment = require("./Comment.js")(sequelize, Sequelize);

db.post.hasMany(db.comment, { onDelete: "CASCADE", hooks: true });
db.comment.belongsTo(db.post);

module.exports = db;
