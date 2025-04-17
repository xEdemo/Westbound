const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { Enum, User } = require("../../models");
const { autoParseAndClean } = require("../../utils/autoParseAndClean.js");

/**
 * @desc	Creates a new enum category and enum
 * @route	POST /api/v1/enum
 * @access	Super Admin
 */
const createEnum = asyncHandler(async (req, res) => {
	const userId = req.user._id.toString();

	const cleanedData = autoParseAndClean(req.body);
	const { category, names, comments } = cleanedData;

	if (!comments) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`Comments are required. Please detail your changes.`);
	}

	if (!category) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error("Please fill out all of the requried fields.");
	}

	const duplicate = await Enum.findOne({ category });
	if (duplicate) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(
			`Name field with value of '${category}' already exists.`
		);
	}

	const user = await User.findById(userId);

	if (!user) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`No user found with id ${userId}.`);
	}

	const enumerator = await Enum.create({
		category,
		names,
		createdBy: {
			user: user._id,
			comments,
		},
		updatedBy: [],
	});

	res.status(StatusCodes.OK).json({ enumerator });
});

/**
 * @desc	Gets every single enum
 * @route	Get /api/v1/enum
 * @access	Admin
 */
const getAllEnums = asyncHandler(async (req, res) => {
	const enumerators = await Enum.find({})
		.select("-__v")
		.sort("category")
		.populate("createdBy.user", "username");
	res.status(StatusCodes.OK).json({
		count: enumerators.length,
		categories: enumerators.map((e) => e.category),
		enumerators,
	});
});

/**
 * @desc	Adds to the names array
 * @route	PUT /api/v1/enum/:enumId
 * @access	Super Admin
 */
const updateEnum = asyncHandler(async (req, res) => {
	const userId = req.user._id.toString();
	const { enumId } = req.params;

	const cleanedData = autoParseAndClean(req.body);
	const { category, names, comments } = cleanedData;

	if (!comments) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`Comments are required. Please detail your changes.`);
	}

	const user = await User.findById(userId);
	if (!user) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`No user found with id ${userId}.`);
	}

	const enumerator = await Enum.findById(enumId);
	if (!enumerator) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`No enum found with Id of '${enumId}'.`);
	}

	if (typeof category !== "undefined" && category !== enumerator.category) {
		const duplicate = await Enum.findOne({ category });
		if (duplicate) {
			res.status(StatusCodes.CONFLICT);
			throw new Error(
				`Name field with value of '${category}' already exists. This field should be unique.`
			);
		}
		enumerator.category = category;
	}

	if (names !== enumerator.names) {
		enumerator.names = names;
	}

	const date = new Date().toISOString();

	enumerator.updatedBy.push({ user: user._id, date, comments });

	await enumerator.save();

	res.status(StatusCodes.OK).json({ enum: enumerator });
});

/**
 * @desc	Deletes an enum and its respective enum category
 * @route	DELETE /api/v1/enum/:enumId
 * @access	Super Admin
 */
const deleteEnumById = asyncHandler(async (req, res) => {
	const { enumId } = req.params;

	const enumerator = await Enum.findById(enumId);
	if (!enumerator) {
		res.status(StatusCodes.NOT_FOUND);
		throw new Error(`Mine with Id ${enumId} not found.`);
	}

	await enumerator.deleteOne();

	res.status(StatusCodes.OK).json({
		msg: `Enum with category of '${enumerator.category}' has been deleted.`,
	});
});

module.exports = {
	createEnum,
	getAllEnums,
	updateEnum,
	deleteEnumById,
};
