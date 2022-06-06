module.exports = app => {
    const comment = require("../controllers/comment.ctrl.js");
    var router = require("express").Router();
    // Create a new comment
    router.post("/", createComment);
    // Retrieve one comment
    router.get("/:id", findOneComment);
     // Retrieve all comments
    router.get("/", findAllComments);
    // Update a comment with id
    router.put("/:id", modifyComments);
    // Delete a comment with id
    router.delete("/:id", deleteComments);
    app.use('/api/comments', router);
  };