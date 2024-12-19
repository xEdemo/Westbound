const express = require("express");
const router = express.Router();

const { protect, admin, superAdmin } = require("../middleware/authHandler.js");

const {
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

// Specific routes first
router
	.route("/environmental")
	.post([protect, superAdmin], createEnvironmentalCrime)
	.get([protect], getAllEnvironmentalCrimes);
router
	.route("/environmental/:crimeId")
	.put([protect, superAdmin], updateEnvironmentalCrime);
router
	.route("/financial")
	.post([protect, superAdmin], createFinancialCrime)
	.get([protect], getAllFinancialCrimes);
router
	.route("/financial/:crimeId")
	.put([protect, superAdmin], updateFinancialCrime);

// Generic routes last
router.route("/").get([protect, superAdmin], getAllCrimes);
router
	.route("/:crimeId")
	.get([protect], getCrimeById)
	.delete([protect, superAdmin], deleteCrimeById);

module.exports = router;
