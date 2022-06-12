const express = require("express");
const router = express.Router();
const user = require("../controllers/user.ctrl");
const auth = require("../controllers/auth.ctrl");

router.post("/signup", auth.signup);
router.post("/login", auth.login);
router.get("/:id", user.findOneUser);
router.get("/", user.findAllUsers);
router.delete("/:id", user.deleteMyAccount);

module.exports = router;
