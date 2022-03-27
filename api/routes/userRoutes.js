const express = require("express");
const router = express.Router();
const userInfoController = require("../controllers/userInfoController");
router.post("/register", userInfoController.register);
router.post("/login", userInfoController.login);
router.get("/whoami", userInfoController.whoami);
router.get("/logout", userInfoController.logout);
router.put("/:userId", userInfoController.userUpdate);
module.exports = router;
