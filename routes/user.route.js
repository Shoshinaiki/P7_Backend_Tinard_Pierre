module.exports = app => {
const express = require("express");
const router  = express.Router();
const user    = require("../controllers/user.ctrl");
  
router.post("/", user.createUser);
router.get("/:id", user.findOneUser);
router.get("/", user.findAllUsers);
router.delete("/:id", user.deleteOneUser);

module.exports = router;
  }