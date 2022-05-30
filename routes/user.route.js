module.exports = app => {
    const user = require("../controllers/user.ctrl.js");
    var router = require("express").Router();
    // Create a new user
    router.post("/", user.create);
    // Retrieve all users
    router.get("/", users.findAll);
    // Retrieve all published users
    router.get("/published", users.findAllPublished);
    // Retrieve a single user with id
    router.get("/:id", user.findOne);
    // Update a user with id
    router.put("/:id", user.update);
    // Delete a user with id
    router.delete("/:id", user.delete);
    // Delete all users
    router.delete("/", users.deleteAll);
    app.use('/api/users', router);
  };