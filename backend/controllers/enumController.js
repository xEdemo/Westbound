const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { Enum, EnumCategory, User } = require("../models");

/**
 * @desc	Creates a new enum category for enum schema
 * @route	POST /api/v1/enum/enum-category
 * @access	Super Admin
 */
const createEnumCategory = asyncHandler(async (req, res) => {
	const userId = req.user._id.toString();
	const { name } = req.body;

	if (!name) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error("Please fill out all of the requried fields.");
	}

	const exist = await EnumCategory.exists({ name });
	if (exist) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`Name field with value of '${name}' already exists.`);
	}

	const user = await User.findById(userId);

	if (!user) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`No user found with id ${userId}.`);
	}

	const enumCategory = await EnumCategory.create({
		name,
		createdBy: user._id,
	});

	res.status(StatusCodes.OK).json({ enumCategory });
});

/**
 * @desc	Gets every single enum category
 * @route	Get /api/v1/enum/enum-category
 * @access	Admin
 */
const getAllEnumCategories = asyncHandler(async (req, res) => {
	const enumCategories = await EnumCategory.find().populate("createdBy", "username");
	res.status(StatusCodes.OK).json({ count: enumCategories.length, enumCategories })
});

/**
 * @desc	Creates a new enum to be used in other schemas
 * @route	POST /api/v1/enum
 * @access	Super Admin
 */
const createEnum = asyncHandler(async (req, res) => {
	const userId = req.user._id.toString();
	const { category, name, parent } = req.body;

	if (!category || !name) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(
			`Please fill out all of the required fields (category and name).`
		);
	}

	const user = await User.findById(userId);

	if (!user) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`No user found with id ${userId}.`);
	}

	const exists = await EnumCategory.exists({ name: category });
	if (!exists) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`Category '${category}' does not exist.`);
	}

	const enumerator = await Enum.create({
		category,
		name,
		parent,
		createdBy: user._id,
	});

	res.status(StatusCodes.OK).json({ enum: enumerator });
});

/**
 * @desc	Gets every single enum
 * @route	Get /api/v1/enum
 * @access	Admin
 */
const getAllEnums = asyncHandler(async (req, res) => {
	const enumerators = await Enum.find().populate("createdBy", "username");
	res.status(StatusCodes.OK).json({ count: enumerators.length, enumerators })
});

module.exports = {
	createEnumCategory,
	getAllEnumCategories,
	createEnum,
	getAllEnums,
};
