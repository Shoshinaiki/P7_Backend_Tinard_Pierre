module.exports = app => {
    const comment = require("../controllers/comment.ctrl.js");
    var router = require("express").Router();
    // Create a new comment
    router.post("/", comment.createComment);
    // Retrieve one comment
    router.get("/:id", comment.findOneComment);
     // Retrieve all comments
    router.get("/", comment.findAllComments);
    // Update a comment with id
    router.put("/:id", comment.modifyComments);
    // Delete a comment with id
    router.delete("/:id", comment.deleteComments);
    app.use('/api/comments', router);
  };