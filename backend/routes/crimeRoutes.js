const express = require("express");
const router = express.Router();

const { protect, admin, superAdmin } = require("../middleware/authHandler.js");

const {
	getAllCrimes,
	getCrimeById,
	createCrime,
	updateCrime,
	deleteCrimeById,
	getAllEnvironmentalCrimes,
	getAllFinancialCrimes,
} = require("../controllers/Crime/crimeController.js");

router.route("/environmental").get([protect], getAllEnvironmentalCrimes);
router.route("/financial").get([protect], getAllFinancialCrimes);
// Generic routes last
router
	.route("/")
	.get([protect], getAllCrimes)
	.post([protect, superAdmin], createCrime);
router
	.route("/:crimeId")
	.get([protect], getCrimeById)
	.put([protect, superAdmin], updateCrime)
	.delete([protect, superAdmin], deleteCrimeById);

module.exports = router;
