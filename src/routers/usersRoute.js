const express = require("express");
const userController = require("../controllers/usersController");
const router = express.Router();

// register user

router.route("/auth/register").post(userController.register);
router.route("/auth/users/all").get(userController.getUsers);

module.exports = router;
