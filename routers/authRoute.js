const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// get

router.route("/user/:id").get(authController.checkToken, authController.search);

module.exports = router;
