module.exports = app => {
const express = require("express");
const router = express.Router();
const comment = require("../controllers/comment.ctrl.js");
    
router.post("/", comment.createComment);
router.get("/:id", comment.findOneComment);
router.get("/", comment.findAllComments);
router.put("/:id", comment.modifyComments);
router.delete("/:id", comment.deleteComments);

module.exports = router;
}