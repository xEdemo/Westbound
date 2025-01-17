const express = require("express");
const router = express.Router();

const { protect, admin, superAdmin } = require("../middleware/authHandler.js");

const {
	createCountry,
	getAllCountries,
	updateCountryById,
	deleteCountryById,
	createState,
	createTown,
} = require("../controllers/countryController.js");



router.route("/").post([protect, superAdmin], createCountry).get([protect], getAllCountries);
router.route("/:countryId").put([protect, superAdmin], updateCountryById).delete([protect, superAdmin], deleteCountryById);
router.route("/state/:countryId").put([protect, superAdmin], createState);
router.route("/town/:countryId/:stateId").put([protect, superAdmin], createTown);

module.exports = router;
