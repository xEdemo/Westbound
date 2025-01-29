const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { Enum, EnumCategory, User } = require("../models");

/**
 * @desc	Creates a new enum category and enum
 * @route	POST /api/v1/enum
 * @access	Super Admin
 */
const createEnum = asyncHandler(async (req, res) => {
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

	const enumerator = await Enum.create({
		category: name,
		names: [],
		createdBy: user._id,
	});

	res.status(StatusCodes.OK).json({ enumCategory, enumerator });
});

/**
 * @desc	Gets every single enum
 * @route	Get /api/v1/enum
 * @access	Admin
 */
const getAllEnums = asyncHandler(async (req, res) => {
	const enumerators = await Enum.find().populate("createdBy", "username");
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
const editNamesByEnumId = asyncHandler(async (req, res) => {
	const userId = req.user._id.toString();
	const { enumId } = req.params;
	const { name, removeName, parent } = req.body;

	if (parent && !name && !removeName) {
		res.status(StatusCodes.NOT_MODIFIED).json({});
		return;
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

	if (removeName && !name && enumerator.names.length === 0) {
		res.status(StatusCodes.NOT_MODIFIED).json({
			msg: "There are no names to remove.",
		});
		return;
	}

	if (Array.isArray(removeName)) {
		enumerator.names = enumerator.names.filter(
			(n) => !removeName.includes(n.name)
		);
	} else if (removeName) {
		enumerator.names = enumerator.names.filter(
			(n) => n.name !== removeName
		);
	}

	if (Array.isArray(name)) {
		for (const n of name) {
			enumerator.names.push({ name: n, parent });
		}
	} else if (name) {
		enumerator.names.push({ name, parent });
	}

	const date = new Date().toISOString();

	enumerator.updatedBy.push({ user: user._id, date });

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

	await EnumCategory.findOneAndDelete({ name: enumerator.category });

	await enumerator.deleteOne();

	res.status(StatusCodes.OK).json({
		msg: `Enum with category of '${enumerator.category}' has been deleted.`,
	});
});

module.exports = {
	createEnum,
	getAllEnums,
	editNamesByEnumId,
	deleteEnumById,
};
