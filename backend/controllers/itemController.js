const { StatusCodes } = require("http-status-codes");
const { Item } = require("../models");
const asyncHandler = require("express-async-handler");
const { itemCategory } = require("../utils/enum.js");

/**
 * @desc	Create an item
 * @route	POST /api/v1/item
 * @access	Super Admin
 */
const createItem = asyncHandler(async (req, res) => {
	const {
		name,
		description,
		image,
		venderBuy,
		venderSell,
		equippable,
		noiseLevel,
		slot,
		armourValue,
		damage,
		accuracy,
		consumable,
		stackable,
		category,
	} = req.body;

	if (!name || !description || !image || !venderBuy || !venderSell) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`Please fill out all required fields.`);
	}

	if (!itemCategory.includes(category)) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(
			`Item category of '${category}' was not found in the enum.`
		);
	}

	const isExist = await Item.findOne({ name });
	if (isExist) {
		res.status(StatusCodes.CONFLICT);
		throw new Error(`An item with the name '${name}' already exists.`);
	}

	if (equippable && !slot) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`Item was made equippable but was not given a slot.`);
	}

	const item = await Item.create({
		name,
		description,
		image,
		value: {
			vender: {
				venderBuy,
				venderSell,
			},
		},
		properties: {
			baseProperties: {
				equippable,
				noiseLevel,
				slot,
				armourValue,
				damage,
				accuracy,
				consumable,
				stackable,
			},
			category,
		},
	});

	res.status(StatusCodes.OK).json({ item });
});

/**
 * @desc	Collects all existing items
 * @route	Get /api/v1/item
 * @access	Private
 */
const getAllItems = asyncHandler(async (req, res) => {
	const items = await Item.find({}).select("-__v").sort("name");
	res.status(StatusCodes.OK).json({ count: items.length, items })
});

module.exports = {
	createItem,
	getAllItems,
};
