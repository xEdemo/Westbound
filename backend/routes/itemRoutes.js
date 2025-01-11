const express = require("express");
const router = express.Router();

const { protect, admin, superAdmin } = require("../middleware/authHandler.js");

const { createItem } = require("../controllers/itemController.js");

router.route("/").post([protect, superAdmin], createItem);

module.exports = router;