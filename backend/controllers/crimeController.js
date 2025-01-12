const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const {
	User,
	Crime,
	FinancialCrime,
	LootTable,
	PenaltyTable,
} = require("../models");
const { crimeType, crimeSubtype } = require("../utils/enum.js");

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
		subtype,
		nothingChance,
		common,
		uncommon,
		rare,
		epic,
		legendary,
		mythic,
		relic,
		masterwork,
		eternal,
		penalty,
		difficulty,
		levelRequired,
		staminaCost,
	} = req.body;

	// Parse nested fields if they are strings
	const parsedCommon =
		typeof common === "string" ? JSON.parse(common) : common;
	const parsedUncommon =
		typeof uncommon === "string" ? JSON.parse(uncommon) : uncommon;
	const parsedRare = typeof rare === "string" ? JSON.parse(rare) : rare;
	const parsedEpic = typeof epic === "string" ? JSON.parse(epic) : epic;
	const parsedLegendary =
		typeof legendary === "string" ? JSON.parse(legendary) : legendary;
	const parsedMythic =
		typeof mythic === "string" ? JSON.parse(mythic) : mythic;
	const parsedRelic = typeof relic === "string" ? JSON.parse(relic) : relic;
	const parsedMasterwork =
		typeof masterwork === "string" ? JSON.parse(masterwork) : masterwork;
	const parsedEternal =
		typeof eternal === "string" ? JSON.parse(eternal) : eternal;
	const parsedPenalty =
		typeof penalty === "string" ? JSON.parse(penalty) : penalty;

	if (
		!name ||
		!levelRequired ||
		!difficulty ||
		!type ||
		!parsedCommon.item ||
		!parsedCommon.cashReward.low ||
		!parsedCommon.cashReward.high ||
		!parsedUncommon.item ||
		!parsedUncommon.cashReward.low ||
		!parsedUncommon.cashReward.high ||
		!parsedRare.item ||
		!parsedRare.cashReward.low ||
		!parsedRare.cashReward.high ||
		!parsedEpic.item ||
		!parsedEpic.cashReward.low ||
		!parsedEpic.cashReward.high ||
		!parsedLegendary.item ||
		!parsedLegendary.cashReward.low ||
		!parsedLegendary.cashReward.high ||
		!parsedMythic.item ||
		!parsedMythic.cashReward.low ||
		!parsedMythic.cashReward.high ||
		!parsedRelic.item ||
		!parsedRelic.cashReward.low ||
		!parsedRelic.cashReward.high ||
		!parsedMasterwork.item ||
		!parsedMasterwork.cashReward.low ||
		!parsedMasterwork.cashReward.high ||
		!parsedEternal.item ||
		!parsedEternal.cashReward.low ||
		!parsedEternal.cashReward.high
	) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`Please fill out all required fields.`);
	}

	if (!crimeType.includes(type)) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`Crime type of '${type}' was not found in the enum.`);
	}

	if (!crimeSubtype[type]?.includes(subtype)) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(
			`Crime subtype of '${subtype}' was not found in the validator.`
		);
	}

	const isExist = await Crime.findOne({ name });
	if (isExist) {
		res.status(StatusCodes.CONFLICT);
		throw new Error(`A crime with the name "${name}" already exists.`);
	}

	const lootTable = await LootTable.create({
		for: name,
		nothing: {
			chance: nothingChance,
		},
		common: {
			item: parsedCommon.item,
			cashReward: {
				low: parsedCommon.cashReward.low,
				high: parsedCommon.cashReward.high,
			},
			chance: parsedCommon.chance,
		},
		uncommon: {
			item: parsedUncommon.item,
			cashReward: {
				low: parsedUncommon.cashReward.low,
				high: parsedUncommon.cashReward.high,
			},
			chance: parsedUncommon.chance,
		},
		rare: {
			item: parsedRare.item,
			cashReward: {
				low: parsedRare.cashReward.low,
				high: parsedRare.cashReward.high,
			},
			chance: parsedRare.chance,
		},
		epic: {
			item: parsedEpic.item,
			cashReward: {
				low: parsedEpic.cashReward.low,
				high: parsedEpic.cashReward.high,
			},
			chance: parsedEpic.chance,
		},
		legendary: {
			item: parsedLegendary.item,
			cashReward: {
				low: parsedLegendary.cashReward.low,
				high: parsedLegendary.cashReward.high,
			},
			chance: parsedLegendary.chance,
		},
		mythic: {
			item: parsedMythic.item,
			cashReward: {
				low: parsedMythic.cashReward.low,
				high: parsedMythic.cashReward.high,
			},
			chance: parsedMythic.chance,
		},
		relic: {
			item: parsedRelic.item,
			cashReward: {
				low: parsedRelic.cashReward.low,
				high: parsedRelic.cashReward.high,
			},
			chance: parsedRelic.chance,
		},
		masterwork: {
			item: parsedMasterwork.item,
			cashReward: {
				low: parsedMasterwork.cashReward.low,
				high: parsedMasterwork.cashReward.high,
			},
			chance: parsedMasterwork.chance,
		},
		eternal: {
			item: parsedEternal.item,
			cashReward: {
				low: parsedEternal.cashReward.low,
				high: parsedEternal.cashReward.high,
			},
			chance: parsedEternal.chance,
		},
	});

	const penaltyTable = await PenaltyTable.create({
		for: name,
		fines: {
			low: parsedPenalty.fines.low,
			high: parsedPenalty.fines.high,
		},
		arrestChance: parsedPenalty.arrestChance,
		jailTime: {
			low: parsedPenalty.jailTime.low,
			high: parsedPenalty.jailTime.high,
		},
	});

	const crime = await Crime.create({
		name,
		type,
		subtype,
		rewards: lootTable._id,
		penalty: penaltyTable._id,
		difficulty,
		levelRequired,
		staminaCost,
	});

	await User.updateMany(
		{},
		{
			$addToSet: {
				crime: {
					id: crime._id,
					name: crime.name,
					level: 1,
					xp: 0,
				},
			},
		}
	);

	res.status(StatusCodes.OK).json({ crime });
});

/**
 * @desc    Used to update a crime
 * @route   PUT /api/v1/crime/:crimeId
 * @access  Super Admin
 */
const updateCrime = asyncHandler(async (req, res) => {
	const { crimeId } = req.params;

	const { name, type, difficulty, levelRequired } = req.body;

	const crime = await Crime.findById(crimeId);

	if (!crime) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`Crime with ID ${crimeId} not found.`);
	}

	res.status(StatusCodes.OK).json({});
});

/**
 * @desc    Used to delete a crime
 * @route   DELETE /api/v1/crime/:crimeId
 * @access  Super Admin
 */
const deleteCrimeById = asyncHandler(async (req, res) => {
	const { crimeId } = req.params;

	const crime = await Crime.findById(crimeId);
	if (!crime) {
		res.status(StatusCodes.NOT_FOUND);
		throw new Error(`Crime with ID ${crimeId} not found in crime records.`);
	}
	// Delete related LootTable and PenaltyTable entries
	await LootTable.findOneAndDelete({ for: crime.name });
	await PenaltyTable.findOneAndDelete({ for: crime.name });

	// Remove the crime from all users
	await User.updateMany(
		{},
		{
		  $pull: {
			crime: { id: crime._id },
		  },
		}
	  );

	await Crime.findByIdAndDelete(crimeId);

	return res.status(StatusCodes.OK).json({
		msg: `Crime (${crime.name}) with ID ${crimeId} successfully deleted.`,
	});
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
