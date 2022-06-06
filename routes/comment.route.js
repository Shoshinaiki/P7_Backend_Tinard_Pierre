module.exports = app => {
    const comment = require("../controllers/comment.ctrl.js");
    var router = require("express").Router();
    // Create a new comment
    router.post("/", comment.create);
    // Retrieve all comments
    router.get("/", comments.findAll);
    router.get("/:id", comment.findOne);
    // Update a comment with id
    router.put("/:id", comment.update);
    // Delete a comment with id
    router.delete("/:id", comment.delete);
    app.use('/api/comments', router);
  };