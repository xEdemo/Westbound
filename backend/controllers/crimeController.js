const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { Crime, EnvironmentalCrime, FinancialCrime } = require("../models");
const { crimeType } = require("../utils/enum.js")

/**
 * @desc    Used to get all existing crimes
 * @route   GET /api/v1/crime
 * @access  Private
 */
const getAllCrimes = asyncHandler(async (req, res) => {
	const crimes = await Crime.find({}).select("-__v").sort("name");
	res.status(StatusCodes.OK).json({ count: crimes.length, crimes });
});

/**
 * @desc    Used to get an existing crimes
 * @route   GET /api/v1/crime/:crimeId
 * @access  Private
 */
const getCrimeById = asyncHandler(async (req, res) => {
	const { crimeId } = req.params;

	console.log(crimeId);

	// Check if ID exists
	const crime = await Crime.findById(crimeId);
	if (crime) {
		return res.status(StatusCodes.OK).json({ crime });
	}

	// If not found in either collection
	res.status(StatusCodes.NOT_FOUND);
	throw new Error(
		`Crime with ID ${crimeId} not found in Financial or Environmental records.`
	);
});

/**
 * @desc	Creates a crime of various types
 * @route	POST /api/v1/crime
 * @access	Super Admin
 */
const createCrime = asyncHandler(async (req, res) => {
	const {
		name,
		type,
		difficulty,
		levelRequired,
		environmentalDamage,
		fineAmount,
	} = req.body;

	if (!name || !levelRequired || !difficulty || !type) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`Please fill out all required fields.`);
	}

	if (!crimeType.includes(type)) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`Crime type of '${type}' was not found in the enum.`)
	}

	const isExist = await Crime.findOne({ name });
	if (isExist) {
		res.status(StatusCodes.CONFLICT);
		throw new Error(
			`A crime with the name "${name}" already exists.`
		);
	}

	let crime;

	if (type === "Financial") {
		if (!fineAmount) {
			res.status(StatusCodes.BAD_REQUEST);
			throw new Error(`Please fill out the fineAmount required fields.`);
		}

		crime = await FinancialCrime.create({
			name,
			type,
			difficulty,
			levelRequired,
			fineAmount,
		});
	} else if (type === "Environmental") {
		if (!environmentalDamage) {
			res.status(StatusCodes.BAD_REQUEST);
			throw new Error(
				`Environmental crimes require environmentalDamage.`
			);
		}

		crime = await EnvironmentalCrime.create({
			name,
			type,
			difficulty,
			levelRequired,
			environmentalDamage,
		});
	} else {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`Invalid crime type.`);
	}

	res.status(StatusCodes.OK).json({ crime });
});

/**
 * @desc    Used to update a crime
 * @route   PUT /api/v1/crime/:crimeId
 * @access  Super Admin
 */
const updateCrime = asyncHandler(async (req, res) => {
	const { crimeId } = req.params;

	const { name, type, difficulty, levelRequired, fineAmount, environmentalDamage } = req.body;

	const crime = await Crime.findById(crimeId);

	if (!crime) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`Crime with ID ${crimeId} not found.`);
	}

	res.status(StatusCodes.OK).json({ });
});

/**
 * @desc    Used to delete an environmental crime
 * @route   DELETE /api/v1/crime/:crimeId
 * @access  Super Admin
 */
const deleteCrimeById = asyncHandler(async (req, res) => {
	const { crimeId } = req.params;

	// Check if ID exists
	const crime = await Crime.findById(crimeId);
	if (crime) {
		// Delete from Crime records first
		await Crime.findByIdAndDelete(crimeId);

		return res.status(StatusCodes.OK).json({
			msg: `Crime (${crime?.name}) with ID ${crimeId} successfully deleted.`,
		});
	}

	res.status(StatusCodes.NOT_FOUND);
	throw new Error(
		`Crime with ID ${crimeId} not found in Financial or Environmental records.`
	);
});

/**
 * @desc    Used to get all environmental crimes
 * @route   GET /api/v1/crime/environmental
 * @access  Private
 */
const getAllEnvironmentalCrimes = asyncHandler(async (req, res) => {
	const environmentalCrimes = await Crime.find({ type: "Environmental" })
		.select("-__v")
		.sort("name");
	res.status(StatusCodes.OK).json({
		count: environmentalCrimes.length,
		environmentalCrimes,
	});
});

/**
 * @desc    Used to get all financial crimes
 * @route   GET /api/v1/crime/financial
 * @access  Private
 */
const getAllFinancialCrimes = asyncHandler(async (req, res) => {
	const financialCrimes = await Crime.find({ type: "Financial" })
		.select("-__v")
		.sort("name");
	res.status(StatusCodes.OK).json({
		count: financialCrimes.length,
		financialCrimes,
	});
});

module.exports = {
	getAllCrimes,
	getCrimeById,
	createCrime,
	updateCrime,
	deleteCrimeById,
	getAllEnvironmentalCrimes,
	getAllFinancialCrimes,
};
