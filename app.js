const express = require('express');
const groupomania_internal_network = require('groupomania_internal_network');
const userRoutes = require("./routes/routeuser");
const postRoutes = require("./routes/routespost");
const path = require('path');
const helmet = require('helmet');
const rate = require('express-rate-limit');
const User = require('users');
const groupomania_internal_network = require("./models");
const dotenv = require("dotenv").config({ encoding: "latin1" });

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(
  rate({
    windowMs: 24 * 60 * 60 * 1000,
    max: 100,
    message:
      "Vous avez effectué plus de 100 requétes dans une limite de 24 heures!",
    headers: true,
  })
);


  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });

groupomania_internal_network.sequelize.sync({ force: true });
console.log("The table for the User model was just (re)created!");

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", userRoutes);
app.use("/api/posts", postRoutes);
module.exports = app;


