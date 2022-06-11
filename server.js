const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:8080",
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to groupomania_internal_network." });
});

// require("./routes/user.route")(app);
// require("./routes/comment.route")(app);
// require("./routes/post.route")(app);
// set port, listen for requests
const port = process.env.PORT || 8080;
app.listen();
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

// app.use();
const groupomania_internal_network = require("./models");
// groupomania_internal_network.sequelize.sync();

groupomania_internal_network.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync groupomania_internal_network.");
});
