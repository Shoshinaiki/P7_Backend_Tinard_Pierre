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
db.postHasLike = require("./PostHasLike.js")(sequelize, Sequelize);

db.user.hasMany(db.post, {onDelete: "CASCADE"})
db.post.belongsTo(db.user)
db.post.hasMany(db.postHasLike, {onDelete: "CASCADE"})
db.postHasLike.belongsTo(db.post)

module.exports = db;
