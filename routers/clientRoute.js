const express = require("express");
const clientController = require("../controllers/clientController");
const authController = require("../controllers/authController");
const router = express.Router();

router.use(authController.checkToken);

// post and get

router.route("/clients/create").post(clientController.create);

router.route("/clients/all").get(clientController.list);

// put

router.route("/client/:id").put(clientController.update);

// delete

router.route("/client/:id").delete(clientController.delete);

module.exports = router;
