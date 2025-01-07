const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { Crime, EnvironmentalCrime, FinancialCrime } = require("../models");

/**
 * @desc    Used to get all existing crimes
 * @route   GET /api/v1/crime
 * @access  Super Admin
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

	// Check if ID exists in Financial collection
	const financialCrime = await Financial.findById(crimeId);
	if (financialCrime) {
		return res.status(StatusCodes.OK).json({
			type: "Financial",
			crime: financialCrime,
		});
	}

	// Check if ID exists in Environmental collection
	const environmentalCrime = await Environmental.findById(crimeId);
	if (environmentalCrime) {
		return res.status(StatusCodes.OK).json({
			type: "Environmental",
			crime: environmentalCrime,
		});
	}

	// If not found in either collection
	res.status(StatusCodes.NOT_FOUND);
	throw new Error(
		`Crime with ID ${crimeId} not found in Financial or Environmental records.`
	);
});

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
 * @desc    Used to delete an environmental crime
 * @route   DELETE /api/v1/crime/:crimeId
 * @access  Super Admin
 */
const deleteCrimeById = asyncHandler(async (req, res) => {
	const { crimeId } = req.params;

	// Check if ID exists in Financial collection
	const financialCrime = await Financial.findById(crimeId);
	if (financialCrime) {
		// Delete from Crime records first
		await Crime.findOneAndDelete({ crime: crimeId, type: "Financial" });

		// Delete from Financial records
		await Financial.findByIdAndDelete(crimeId);

		return res.status(StatusCodes.OK).json({
			msg: `Financial crime with ID ${crimeId} successfully deleted.`,
		});
	}

	// Check if ID exists in Environmental collection
	const environmentalCrime = await Environmental.findById(crimeId);
	if (environmentalCrime) {
		// Delete from Crime records first
		await Crime.findOneAndDelete({ crime: crimeId, type: "Environmental" });

		// Delete from Environmental records
		await Environmental.findByIdAndDelete(crimeId);

		return res.status(StatusCodes.OK).json({
			msg: `Environmental crime with ID ${crimeId} successfully deleted.`,
		});
	}

	res.status(StatusCodes.NOT_FOUND);
	throw new Error(
		`Crime with ID ${crimeId} not found in Financial or Environmental records.`
	);
});

/**
 * @desc    Used to create an environmental crime
 * @route   POST /api/v1/crime/environmental
 * @access  Super Admin
 */
const createEnvironmentalCrime = asyncHandler(async (req, res) => {
	const { name, levelRequired, baseChanceToSucceed } = req.body;

	// Would also have to create a loot table, could implement it here

	// Check if required fields exist
	if (!name || !levelRequired || !baseChanceToSucceed) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`Please fill out all required fields.`);
	}

	// Check if unique fields already exist
	const isExist = await Environmental.findOne({ name });
	if (isExist) {
		res.status(StatusCodes.CONFLICT);
		throw new Error(
			`An environmental crime with the name "${name}" already exists.`
		);
	}

	// Create environmental crime
	const environmentalCrime = new Environmental({
		name,
		levelRequired,
		baseChanceToSucceed,
	});

	await environmentalCrime.save();

	// Update Crime schema
	const crime = new Crime({
		name,
		type: "Environmental",
		crime: environmentalCrime._id,
	});

	await crime.save();

	res.status(StatusCodes.CREATED).json({ environmentalCrime });
});

/**
 * @desc    Used to get all environmental crimes
 * @route   GET /api/v1/crime/environmental
 * @access  Private
 */
const getAllEnvironmentalCrimes = asyncHandler(async (req, res) => {
	const environmentalCrimes = await Environmental.find({})
		.select("-__v")
		.sort("name");
	res.status(StatusCodes.OK).json({
		count: environmentalCrimes.length,
		environmentalCrimes,
	});
});

/**
 * @desc    Used to update an environmental crime
 * @route   PUT /api/v1/crime/environmental/:crimeId
 * @access  Super Admin
 */
const updateEnvironmentalCrime = asyncHandler(async (req, res) => {
	const { crimeId } = req.params;
	const { name, levelRequired, baseChanceToSucceed } = req.body;
	const updateData = {};

	// Validate that the ID is provided
	if (!crimeId) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(
			"An ID must be provided to update an environmental crime."
		);
	}

	// Fetch the existing environmental crime
	const environmentalCrime = await Environmental.findById(crimeId);
	if (!environmentalCrime) {
		res.status(StatusCodes.NOT_FOUND);
		throw new Error(`Environmental crime with ID ${crimeId} not found.`);
	}

	// Check if name is being updated and ensure uniqueness
	if (name && name !== environmentalCrime.name) {
		const isExist = await Environmental.findOne({ name });
		if (isExist) {
			res.status(StatusCodes.CONFLICT);
			throw new Error(
				`An environmental crime with the name "${name}" already exists.`
			);
		}
		updateData.name = name;
	}

	// Update other fields only if they are provided
	if (levelRequired) {
		updateData.levelRequired = levelRequired;
	} else {
		updateData.levelRequired = environmentalCrime.levelRequired;
	}
	if (baseChanceToSucceed) {
		updateData.baseChanceToSucceed = baseChanceToSucceed;
	} else {
		updateData.baseChanceToSucceed = environmentalCrime.baseChanceToSucceed;
	}

	// Update the document
	const updatedCrime = await Environmental.findByIdAndUpdate(
		crimeId,
		updateData,
		{
			new: true, // Return the updated document
			runValidators: true, // Ensure validation only for updated fields
			overwrite: false,
		}
	);

	res.status(StatusCodes.OK).json({
		msg: "Environmental crime updated successfully.",
		updatedCrime,
	});
});

/**
 * @desc    Used to create a financial crime
 * @route   POST /api/v1/crime/financial
 * @access  Super Admin
 */
const createFinancialCrime = asyncHandler(async (req, res) => {
	const { name, levelRequired, baseChanceToSucceed } = req.body;

	// Would also have to create a loot table, could implement it here

	// Check if required fields exist
	if (!name || !levelRequired || !baseChanceToSucceed) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`Please fill out all required fields.`);
	}

	// Check if unique fields already exist
	const isExist = await Financial.findOne({ name });
	if (isExist) {
		res.status(StatusCodes.CONFLICT);
		throw new Error(
			`An environmental crime with the name "${name}" already exists.`
		);
	}

	// Create financial crime
	const financialCrime = new Financial({
		name,
		levelRequired,
		baseChanceToSucceed,
	});

	await financialCrime.save();

	// Update Crime schema
	const crime = new Crime({
		name,
		type: "Financial",
		crime: financialCrime._id,
	});

	await crime.save();

	res.status(StatusCodes.CREATED).json({ financialCrime });
});

/**
 * @desc    Used to get all financial crimes
 * @route   GET /api/v1/crime/financial
 * @access  Private
 */
const getAllFinancialCrimes = asyncHandler(async (req, res) => {
	const financialCrimes = await Financial.find({})
		.select("-__v")
		.sort("name");
	res.status(StatusCodes.OK).json({
		count: financialCrimes.length,
		financialCrimes,
	});
});

/**
 * @desc    Used to update a financial crime
 * @route   PUT /api/v1/crime/financial/:crimeId
 * @access  Super Admin
 */
const updateFinancialCrime = asyncHandler(async (req, res) => {
	const { crimeId } = req.params;
	const { name, levelRequired, baseChanceToSucceed } = req.body;
	const updateData = {};

	// Validate that the ID is provided
	if (!crimeId) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error("An ID must be provided to update an financial crime.");
	}

	// Fetch the existing financial crime
	const financialCrime = await Financial.findById(crimeId);
	if (!financialCrime) {
		res.status(StatusCodes.NOT_FOUND);
		throw new Error(`Financial crime with ID ${crimeId} not found.`);
	}

	// Check if name is being updated and ensure uniqueness
	if (name && name !== financialCrime.name) {
		const isExist = await Financial.findOne({ name });
		if (isExist) {
			res.status(StatusCodes.CONFLICT);
			throw new Error(
				`An financial crime with the name "${name}" already exists.`
			);
		}
		updateData.name = name;
	}

	// Update other fields only if they are provided
	if (levelRequired) {
		updateData.levelRequired = levelRequired;
	} else {
		updateData.levelRequired = financialCrime.levelRequired;
	}
	if (baseChanceToSucceed) {
		updateData.baseChanceToSucceed = baseChanceToSucceed;
	} else {
		updateData.baseChanceToSucceed = financialCrime.baseChanceToSucceed;
	}

	// Update the document
	const updatedCrime = await Financial.findByIdAndUpdate(
		crimeId,
		updateData,
		{
			new: true, // Return the updated document
			runValidators: true, // Ensure validation only for updated fields
			overwrite: false,
		}
	);

	res.status(StatusCodes.OK).json({
		msg: "Environmental crime updated successfully.",
		updatedCrime,
	});
});

module.exports = {
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
};
