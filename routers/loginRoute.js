const express = require("express");
const loginController = require("../controllers/loginController");
const router = express.Router();

// post

router.route("/auth/login").post(loginController.login);

module.exports = router;
