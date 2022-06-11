module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const createMessage = require("../controllers/post.ctrl");
  const findAllMessages = require("../controllers/post.ctrl");
  const findOneMessage = require("../controllers/post.ctrl");
  const modifyMessage = require("../controllers/post.ctrl");
  const deleteMessage = require("../controllers/post.ctrl");

  router.post("/", createMessage);
  router.get("/", findAllMessages);
  router.get("/", findOneMessage);
  router.put("/:id", modifyMessage);
  router.delete("/:id", deleteMessage);

  module.exports = router;
};
