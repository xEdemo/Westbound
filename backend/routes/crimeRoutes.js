const express = require("express");
const router = express.Router();

const { protect, admin, superAdmin } = require("../middleware/authHandler.js");

const {
	createCrime,
	getAllCrimes,
	getCrimeById,
	deleteCrimeById,
	createEnvironmentalCrime,
	getAllEnvironmentalCrimes,
	updateEnvironmentalCrime,
	createFinancialCrime,
	getAllFinancialCrimes,
	updateFinancialCrime,
} = require("../controllers/crimeController.js");

// Generic routes last
router.route("/").get([protect, superAdmin], getAllCrimes).post([protect, superAdmin], createCrime);
router
	.route("/:crimeId")
	.get([protect], getCrimeById)
	.delete([protect, superAdmin], deleteCrimeById);

module.exports = router;
