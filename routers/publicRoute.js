const express = require("express");
const publicController = require("../controllers/publicController");
const router = express.Router();

router.route("/").get(publicController.public);

module.exports = router;
