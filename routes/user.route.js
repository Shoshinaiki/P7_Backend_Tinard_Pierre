module.exports = app => {
    const user = require("../controllers/user.ctrl.js");
    var router = require("express").Router();
    // Create a new user
    router.post("/", user.createUser);
    // Retrieve all users
    router.get("/:id", user.findOneUser);
    // Update a user with id
    router.get("/", user.findAllUsers);
    // Retrieve a single user with id
    // router.put("/:id", user.updateUsers);
    // Delete a user with id
    router.delete("/:id", user.deleteOneUser);
    app.use('/api/users', router);
    router.delete("/:id", user.deleteMyAccount);
    app.use('/api/users', router);
  };