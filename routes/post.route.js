module.exports = app => { 
const express = require("express");
const router  = express.Router();
const post    = require("../controllers/post.ctrl"); 
  
router.post("/", post.createMessage);
router.get("/", post.findAllMessages);
router.get("/", post.findOneMessage); 
router.put("/:id", post.modifyMessage);
router.delete("/:id", post.deleteMessage);
  
module.exports = router;
}