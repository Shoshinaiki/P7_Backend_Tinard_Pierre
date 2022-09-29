const express = require("express");
const db = require("./models/index");
const userRoutes = require("./routes/user.route.js");
const postRoutes = require("./routes/post.route.js");
const path = require("path");
const helmet = require("helmet");
const rate = require("express-rate-limit");

// test

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
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

db.sequelize
  .sync({ alter: true })
  .then(() => console.log("DB connection OK"))
  .catch((err) => {
    console.log("DB connection failed !");
  });

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", userRoutes);
app.use("/api/posts", postRoutes);
module.exports = app;
