const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { Mine } = require("../models");
const {
	mineTypeOfMine,
	mineHazards,
	minePositiveEventType,
	mineNegativeEventType,
} = require("../utils/enum.js");

/**
 * @desc	Creates a mine
 * @route	POST /api/v1/mine
 * @access	Super Admin
 */
const createMine = asyncHandler(async (req, res) => {
	const {
		name,
		image,
		typeOfMine,
		description,
		location,
		miningLevelRequirement,
		resources,
		maxYield,
		hazards,
		maxDepth,
		equipmentNeeded,
		positiveEventType,
		negativeEventType,
		npcInteraction,
	} = req.body;

	// Arrays and objects need to be parsed
	const parsedResources =
		typeof resources === "string" ? JSON.parse(resources) : resources;
	const parsedHazards =
		typeof hazards === "string" ? JSON.parse(hazards) : hazards;
	const parsedPositiveEventType =
		typeof positiveEventType === "string"
			? JSON.parse(positiveEventType)
			: positiveEventType;
	const parsedNegativeEventType =
		typeof negativeEventType === "string"
			? JSON.parse(negativeEventType)
			: negativeEventType;

	if (
		!name ||
		!image ||
		!typeOfMine ||
		!description ||
		!location ||
		!miningLevelRequirement ||
		!maxYield ||
		!hazards ||
		!equipmentNeeded
	) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`Please fill out all required fields.`);
	}

	if (!mineTypeOfMine.includes(typeOfMine)) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`${typeOfMine} does not exist in the enum.`);
	}

	if (
		!Array.isArray(parsedHazards) ||
		!parsedHazards.every((hazard) => mineHazards.includes(hazard))
	) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(
			`One or more hazards in ${JSON.stringify(
				parsedHazards
			)} do not exist in the enum.`
		);
	}

	if (
		!Array.isArray(parsedPositiveEventType) ||
		!parsedPositiveEventType.every((event) =>
			minePositiveEventType[typeOfMine]?.includes(event)
		)
	) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(
			`One or more positive events in ${JSON.stringify(
				parsedPositiveEventType
			)} do not exist in the enum for '${typeOfMine}' type.`
		);
	}

	if (
		!Array.isArray(parsedNegativeEventType) ||
		!parsedNegativeEventType.every((event) =>
			mineNegativeEventType[typeOfMine]?.includes(event)
		)
	) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(
			`One or more negative events in ${JSON.stringify(
				parsedNegativeEventType
			)} do not exist in the enum for '${typeOfMine}' type.`
		);
	}

	const isExist = await Mine.findOne({ name });
	if (isExist) {
		res.status(StatusCodes.CONFLICT);
		throw new Error(`A mine with the name '${name}' already exists.`);
	}

	const mine = await Mine.create({
		name,
		image,
		typeOfMine,
		description,
		location,
		miningLevelRequirement,
		resources: {
			iron: parsedResources.iron,
			silver: parsedResources.silver,
			gold: parsedResources.gold,
			gems: parsedResources.gems,
		},
		maxYield,
		hazards: parsedHazards,
		maxDepth,
		equipmentNeeded,
		events: {
			positiveEventType: parsedPositiveEventType,
			negativeEventType: parsedNegativeEventType,
		},
		npcInteraction,
	});

	res.status(StatusCodes.OK).json({ mine });
});

/**
 * @desc	Get all mines
 * @route	Get /api/v1/mine
 * @access	Private
 */
const getAllMines = asyncHandler(async (req, res) => {
	const mines = await Mine.find({}).select("-__v").sort("name");
	res.status(StatusCodes.OK).json({ count: mines.length, mines });
});

/**
 * @desc	Updates a mine
 * @route	PUT /api/v1/mine/:mineId
 * @access	Super Admin
 */
const updateMineById = asyncHandler(async (req, res) => {
	const { mineId } = req.params;

	const {
		name,
		image,
		typeOfMine,
		description,
		location,
		miningLevelRequirement,
		resources,
		maxYield,
		hazards,
		maxDepth,
		equipmentNeeded,
		positiveEventType,
		negativeEventType,
		npcInteraction,
	} = req.body;

	// Arrays and objects need to be parsed
	const parsedResources =
		typeof resources === "string" ? JSON.parse(resources) : resources;
	const parsedHazards =
		typeof hazards === "string" ? JSON.parse(hazards) : hazards;
	const parsedPositiveEventType =
		typeof positiveEventType === "string"
			? JSON.parse(positiveEventType)
			: positiveEventType;
	const parsedNegativeEventType =
		typeof negativeEventType === "string"
			? JSON.parse(negativeEventType)
			: negativeEventType;

	const mine = await Mine.findById(mineId);

	if (!mine) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`Mine with ID ${mineId} not found.`);
	}

	if (name && name !== mine.name) {
		// check to see if this name already exists for another mine due to unique field
		const isExist = await Mine.findOne({ name });
		if (isExist) {
			res.status(StatusCodes.CONFLICT);
			throw new Error(`A mine with the name '${mine}' already exists.`);
		}
		// if check passes, change the name of the mine
		mine.name = name;
	}
	if (image && image !== mine.image) {
		mine.image = image;
	}
	if (description && description !== mine.description) {
		mine.description = description;
	}
	if (typeOfMine && typeOfMine !== mine.typeOfMine) {
		if (!mineTypeOfMine.includes(typeOfMine)) {
			res.status(StatusCodes.BAD_REQUEST);
			throw new Error(`${typeOfMine} does not exist in the enum.`);
		}
		mine.typeOfMine = typeOfMine;
	}
	if (location && location !== mine.location) {
		mine.location = location;
	}
	if (
		miningLevelRequirement &&
		miningLevelRequirement !== mine.miningLevelRequirement
	) {
		mine.miningLevelRequirement = miningLevelRequirement;
	}
	if (
		parsedResources?.iron &&
		parsedResources?.iron !== mine.resources.iron
	) {
		mine.resources.iron = parsedResources.iron;
	}
	if (
		parsedResources?.silver &&
		parsedResources?.silver !== mine.resources.silver
	) {
		mine.resources.silver = parsedResources.silver;
	}
	if (
		parsedResources?.gold &&
		parsedResources?.gold !== mine.resources.gold
	) {
		mine.resources.gold = parsedResources.gold;
	}
	if (
		parsedResources?.gems &&
		parsedResources?.gems !== mine.resources.gems
	) {
		mine.resources.gems = parsedResources.gems;
	}
	if (
		mine.resources.iron +
			mine.resources.silver +
			mine.resources.gold +
			mine.resources.gems !==
		100
	) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(
			`Resources must sum up to 100. The current sum is ${
				mine.resources.iron +
				mine.resources.silver +
				mine.resources.gold +
				mine.resources.gems
			}`
		);
	}
	if (maxYield && maxYield !== mine.maxYield) {
		mine.maxYield = maxYield;
	}
	if (parsedHazards && parsedHazards !== mine.hazards) {
		if (
			!Array.isArray(parsedHazards) ||
			!parsedHazards.every((hazard) => mineHazards.includes(hazard))
		) {
			res.status(StatusCodes.BAD_REQUEST);
			throw new Error(
				`One or more hazards in ${JSON.stringify(
					parsedHazards
				)} do not exist in the enum.`
			);
		}

		mine.hazards = parsedHazards;
	}
	if (maxDepth && maxDepth !== mine.maxDepth) {
		mine.maxDepth = maxDepth;
	}
	if (equipmentNeeded && equipmentNeeded !== mine.equipmentNeeded) {
		mine.equipmentNeeded = equipmentNeeded;
	}
	if (
		parsedPositiveEventType &&
		parsedPositiveEventType !== mine.events.positiveEventType
	) {
		if (
			!Array.isArray(parsedPositiveEventType) ||
			!parsedPositiveEventType.every((event) =>
				minePositiveEventType[typeOfMine]?.includes(event)
			)
		) {
			res.status(StatusCodes.BAD_REQUEST);
			throw new Error(
				`One or more positive events in ${JSON.stringify(
					parsedPositiveEventType
				)} do not exist in the enum for '${typeOfMine}' type.`
			);
		}
		mine.events.positiveEventType = parsedPositiveEventType;
	}
	if (
		parsedNegativeEventType &&
		parsedNegativeEventType !== mine.events.negativeEventType
	) {
		if (
			!Array.isArray(parsedNegativeEventType) ||
			!parsedNegativeEventType.every((event) =>
				mineNegativeEventType[typeOfMine]?.includes(event)
			)
		) {
			res.status(StatusCodes.BAD_REQUEST);
			throw new Error(
				`One or more negative events in ${JSON.stringify(
					parsedNegativeEventType
				)} do not exist in the enum for '${typeOfMine}' type.`
			);
		}
		mine.events.negativeEventType = parsedNegativeEventType;
	}
	if (npcInteraction && npcInteraction !== mine.npcInteraction) {
		mine.npcInteraction = npcInteraction;
	}
	// save the document after all changes have been completed
	await mine.save();

	res.status(StatusCodes.OK).json({ mine });
});

/**
 * @desc	Deletes a mine
 * @route	DELETE /api/v1/mine/:mineId
 * @access	Super Admin
 */
const deleteMineById = asyncHandler(async (req, res) => {
	const { mineId } = req.params;

	const mine = await Mine.findById(mineId);
	if (!mine) {
		res.status(StatusCodes.NOT_FOUND);
		throw new Error(`Mine with Id ${mineId} not found in mine records.)`);
	}
	// delete everywhere where mine is referenced

	await mine.deleteOne();

	res.status(StatusCodes.OK).json({
		msg: `${mine.name} with ID ${mineId} successfully deleted.`,
	});
});

module.exports = {
	createMine,
	getAllMines,
	updateMineById,
	deleteMineById,
};
