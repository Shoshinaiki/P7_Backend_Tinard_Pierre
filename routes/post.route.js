const express = require("express");
const router = express.Router();
const post = require("../controllers/post.ctrl");
const multer = require("../middleware/multerConfig.js")
const auth = require("../middleware/auth.js")

router.post("/", auth, multer, post.createMessage);
router.get("/", auth, post.findAllMessages);
router.get("/:id", auth, post.findOneMessage);
router.delete("/:id", auth, post.deleteMessage);
router.put("/:id/:userId", post.like);
router.put("/:id",auth, multer, post.modifyMessage);

module.exports = router;
