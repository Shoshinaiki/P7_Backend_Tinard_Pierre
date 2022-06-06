const express           = require("express");
const router            = express.Router();
const post         = require("../controllers/post.ctrl"); // modif 1 + ctrl
  
router.post("/", post.createMessage);
router.get("/", post.findAllMessages);
router.get("/", post.findOneMessage); // modif 2 + post.
router.put("/:id", post.modifyMessage);
router.delete("/:id", post.deleteMessage);
  
module.exports = router;