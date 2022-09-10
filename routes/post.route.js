const express = require("express");
const router = express.Router();
const post = require("../controllers/post.ctrl");

router.post("/", post.createMessage);
router.get("/", post.findAllMessages);
router.get("/:id", post.findOneMessage);
router.delete("/:id", post.deleteMessage);

module.exports = router;
