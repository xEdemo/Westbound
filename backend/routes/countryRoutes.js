const express = require("express");
const router = express.Router();

const { protect, admin, superAdmin } = require("../middleware/authHandler.js");

const {
	createCountry,
	createState,
	createTown,
} = require("../controllers/countryController.js");

router.route("/").post([protect, superAdmin], createCountry);

router.route("/:countryId/:stateId").put([protect, superAdmin], createTown);

router.route("/:countryId").put([protect, superAdmin], createState);

module.exports = router;
