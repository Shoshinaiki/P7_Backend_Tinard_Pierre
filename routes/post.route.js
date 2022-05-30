module.exports = app => {
    const post = require("../controllers/post.ctrl.js");
    var router = require("express").Router();
    // Create a new post
    router.post("/", post.create);
    // Retrieve all posts
    router.get("/", posts.findAll);
    // Retrieve all published posts
    router.get("/published", posts.findAllPublished);
    // Retrieve a single post with id
    router.get("/:id", post.findOne);
    // Update a post with id
    router.put("/:id", post.update);
    // Delete a post with id
    router.delete("/:id", post.delete);
    // Delete all posts
    router.delete("/", posts.deleteAll);
    app.use('/api/posts', router);
  };