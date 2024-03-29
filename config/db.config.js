const dotenv = require("dotenv").config({ encoding: "latin1"});
const password = process.env.DB_PASSWORD

module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: password, 
  DB: "groupomania",
  dialect: "mysql",
  pool: {
    max: 5, 
    min: 0,
    acquire: 30000,
    idle: 10000,
  }, 
}
