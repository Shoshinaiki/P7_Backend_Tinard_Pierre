module.exports = app => {
    const comment = require("../controllers/comment.ctrl.js");
    var router = require("express").Router();
    // Create a new comment
    router.post("/", comment.create);
    // Retrieve all comments
    router.get("/", comments.findAll);
    // Retrieve all published comments
    router.get("/published", comments.findAllPublished);
    // Retrieve a single comment with id
    router.get("/:id", comment.findOne);
    // Update a comment with id
    router.put("/:id", comment.update);
    // Delete a comment with id
    router.delete("/:id", comment.delete);
    // Delete all comments
    router.delete("/", comments.deleteAll);
    app.use('/api/comments', router);
  };