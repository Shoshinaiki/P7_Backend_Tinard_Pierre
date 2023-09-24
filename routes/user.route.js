const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controller");
const auth = require("../middleware/auth.js");
const admin = require("../middleware/admin");

router.post("/signup", user.signup);
router.post("/login", user.login);
router.get("/:id", auth, user.findOneUser);
router.get("/", auth, admin, user.findAllUsers);
router.delete("/:id", auth, user.deleteMyAccount);

module.exports = router;
