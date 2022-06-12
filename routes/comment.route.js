const express = require("express");
const router = express.Router();
const comment = require("../controllers/comment.ctrl.js");

router.post("/", comment.createComment);
router.delete("/:id", comment.deleteComments);

module.exports = router;
