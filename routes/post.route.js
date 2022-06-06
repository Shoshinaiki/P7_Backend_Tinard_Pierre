const express           = require("express");
const router            = express.Router();
const post         = require("../controllers/post");
  
router.post("/", post.createMessage);
router.get("/", post.findAllMessages);
router.get("/", findOneMessage);
router.put("/:id", post.modifyMessage);
router.delete("/:id", post.deleteMessage);
  
module.exports = router;