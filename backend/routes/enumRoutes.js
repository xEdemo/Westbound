const express = require("express");
const router = express.Router();

const { protect, admin, superAdmin } = require("../middleware/authHandler.js");

const { createEnumCategory, getAllEnumCategories, createEnum, getAllEnums } = require("../controllers/enumController.js");

router.route("/enum-category").post([protect, superAdmin], createEnumCategory).get([protect, admin], getAllEnumCategories);
router.route("/").post([protect, superAdmin], createEnum).get([protect, admin], getAllEnums);

module.exports = router;
