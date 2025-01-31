const { StatusCodes } = require("http-status-codes");
const { Item, Enum, User } = require("../../models");
const asyncHandler = require("express-async-handler");
const { uploadImageToCloudinary } = require("../../middleware/upload.js");
const cloudinary = require("../../config/cloudinary.js");

/**
 * @desc	Create an item
 * @route	POST /api/v1/item
 * @access	Super Admin
 */
const createItem = asyncHandler(async (req, res) => {
	const userId = req.user._id.toString();

	const {
		name,
		description,
		venderBuy,
		venderSell,
		slot,
		isConsumable,
		isStackable,
		isTradeable,
		isQuestItem,
		isEquippable,
		category,
		effect,
		armour,
		weapon,
	} = req.body;

	const parseEffect =
		typeof effect === "string" ? JSON.parse(effect) : effect;
	const parseArmour =
		typeof armour === "string" ? JSON.parse(armour) : armour;
	const parseWeapon =
		typeof weapon === "string" ? JSON.parse(weapon) : weapon;

	if (!name || !description || !venderBuy || !venderSell || !category) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`Please fill out all required fields.`);
	}

	const itemCategory = await Enum.findOne({ category: "itemCategory" });

	if (!itemCategory.names.some((n) => n.name === category)) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(
			`Item category of '${category}' was not found in the enum.`
		);
	}

	const user = await User.findById(userId);

	if (!user) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`No user found with id ${userId}.`);
	}

	const existingItem = await Item.findOne({ name });
	if (existingItem) {
		res.status(StatusCodes.CONFLICT);
		throw new Error(`An item with the name '${name}' already exists.`);
	}

	if (isEquippable && !slot) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`Item was made equippable but was not given a slot.`);
	}

	if (!req.file) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`An image is required.`);
	}
	// prettier-ignore
	const { url, publicId } = await uploadImageToCloudinary(req.file,`items/${category}`);

	const item = await Item.create({
		name,
		description,
		image: {
			url,
			publicId,
		},
		value: {
			vender: {
				venderBuy,
				venderSell,
			},
		},
		slot,
		isConsumable,
		isStackable,
		isTradeable,
		isQuestItem,
		isEquippable,
		armour: {
			rating: parseArmour?.rating,
		},
		effect: {
			type: parseEffect?.type,
			description: parseEffect?.description,
			amount: parseEffect?.amount,
			duration: {
				value: parseEffect?.duration?.value,
				unit: parseEffect?.duration?.unit,
			},
			cooldown: {
				value: parseEffect?.cooldown?.value,
				unit: parseEffect?.cooldown?.unit,
			},
		},
		category,
		weapon: {
			type: parseWeapon?.type,
			noiseLevel: parseWeapon?.noiseLevel,
			accuracy: parseWeapon?.accuracy,
			damage: {
				type: parseWeapon?.damage?.type,
				amount: parseWeapon?.damage?.amount,
			},
			ammunition: {
				type: parseWeapon?.ammunition?.type,
				expenditure: {
					high: parseWeapon?.ammunition?.expenditure?.high,
					low: parseWeapon?.ammunition?.expenditure?.low,
				},
			},
		},
		createdBy: user._id,
	});

	if (!item.category.includes("Weapon")) {
		item.weapon = undefined;
		await item.save();
	}

	res.status(StatusCodes.CREATED).json({ item });
});

/**
 * @desc	Collects all existing items
 * @route	Get /api/v1/item
 * @access	Private
 */
const getAllItems = asyncHandler(async (req, res) => {
	const items = await Item.find({}).select("-__v").sort("name");
	res.status(StatusCodes.OK).json({ count: items.length, items });
});

/**
 * @desc	Delete an item
 * @route	DELETE /api/v1/item/:itemId
 * @access	Super Admin
 */
const deleteItem = asyncHandler(async (req, res) => {
	const { itemId } = req.params;

	const item = await Item.findById(itemId);
	if (!item) {
		res.status(StatusCodes.NOT_FOUND);
		throw new Error(`Item with ID ${itemId} not found.`);
	}

	try {
		await cloudinary.uploader.destroy(item.image.publicId);
	} catch (error) {
		console.error("Cloudinary Error:", error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR);
		throw new Error("Failed to delete item image from Cloudinary.");
	}

	await item.deleteOne();

	res.status(StatusCodes.OK).json({
		msg: `${item?.name} was successfully deleted.`,
	});
});

module.exports = {
	createItem,
	getAllItems,
	deleteItem,
};
