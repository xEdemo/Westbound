const { StatusCodes } = require("http-status-codes");
const { Item, Enum, User } = require("../../models");
const asyncHandler = require("express-async-handler");
const { uploadImageToCloudinary } = require("../../middleware/upload.js");
const cloudinary = require("../../config/cloudinary.js");
const { cleanObject } = require("../../utils/cleanObject.js");

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
		comments,
	} = req.body;

	const isSlotEmpty = !slot ? undefined : slot;

	const parseEffect =
		typeof effect === "string" ? JSON.parse(effect) : effect;
	const parseArmour =
		typeof armour === "string" ? JSON.parse(armour) : armour;
	const parseWeapon =
		typeof weapon === "string" ? JSON.parse(weapon) : weapon;

	const cleanedEffect = cleanObject(parseEffect);
	const cleanedArmour = cleanObject(parseArmour);
	const cleanedWeapon = cleanObject(parseWeapon);

	const isConsumableBoolean =
		typeof isConsumable === "string"
			? isConsumable.toLowerCase() === "true"
				? true
				: isConsumable.toLowerCase() === "false"
				? false
				: null
			: isConsumable;
	const isStackableBoolean =
		typeof isStackable === "string"
			? isStackable.toLowerCase() === "true"
				? true
				: isStackable.toLowerCase() === "false"
				? false
				: null
			: isStackable;
	const isTradeableBoolean =
		typeof isTradeable === "string"
			? isTradeable.toLowerCase() === "true"
				? true
				: isTradeable.toLowerCase() === "false"
				? false
				: null
			: isTradeable;
	const isQuestItemBoolean =
		typeof isQuestItem === "string"
			? isQuestItem.toLowerCase() === "true"
				? true
				: isQuestItem.toLowerCase() === "false"
				? false
				: null
			: isQuestItem;
	const isEquippableBoolean =
		typeof isEquippable === "string"
			? isEquippable.toLowerCase() === "true"
				? true
				: isEquippable.toLowerCase() === "false"
				? false
				: null
			: isEquippable;

	if (!name || !description || !venderBuy || !venderSell || !category) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`Please fill out all required fields.`);
	}

	const itemSlot = await Enum.findOne({ category: "itemSlot" });
	if (isSlotEmpty && !itemSlot.names.some((n) => n.name === isSlotEmpty)) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`Item slot of '${isSlotEmpty}' was not found in the enum.`);
	}

	const itemCategory = await Enum.findOne({ category: "itemCategory" });
	if (!itemCategory.names.some((n) => n.name === category)) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(
			`Item category of '${category}' was not found in the enum.`
		);
	}

	const itemEffectType = await Enum.findOne({ category: "itemEffectType" });
	if (
		cleanedEffect &&
		cleanedEffect.type &&
		!itemEffectType.names.some((n) => n.name === cleanedEffect.type)
	) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(
			`Item effect type of ${cleanedEffect?.type} was not found in the enum.`
		);
	}

	const itemWeaponType = await Enum.findOne({ category: "itemWeaponType" });
	if (
		cleanedWeapon &&
		cleanedWeapon.type &&
		!itemWeaponType.names.some(
			(n) => n.name === cleanedWeapon.type && n.parent === category
		)
	) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(
			`Item weapon type of ${cleanedWeapon?.type} was not found in the enum.`
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

	if (isEquippableBoolean && !isSlotEmpty) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`Item was made equippable but was not given a slot.`);
	}

	if (
		(cleanedEffect && cleanedEffect.applyChance > 100) ||
		(cleanedEffect && cleanedEffect.applyChance < 1)
	) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`Apply chance must be within a range of 1-100.`);
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
		slot: isSlotEmpty,
		isConsumable: isConsumableBoolean,
		isStackable: isStackableBoolean,
		isTradeable: isTradeableBoolean,
		isQuestItem: isQuestItemBoolean,
		isEquippable: isEquippableBoolean,
		armour: cleanedArmour,
		effect: cleanedEffect,
		category,
		weapon: cleanedWeapon,
		createdBy: {
			user: user._id,
			comments,
		},
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
	const items = await Item.find({})
		.select("-__v")
		.sort("name")
		.populate("createdBy.user", "username");
	res.status(StatusCodes.OK).json({ count: items.length, items });
});

/**
 * @desc	Grabs a single item
 * @route	Get /api/v1/item/:itemId
 * @access	Private
 */
const getItemById = asyncHandler(async (req, res) => {
	const { itemId } = req.params;
	const item = await Item.findById(itemId);
	if (!item) {
		res.status(StatusCodes.NOT_FOUND);
		throw new Error(`Item with ID ${itemId} not found.`);
	}
	res.status(StatusCodes.OK).json({ item });
});

/**
 * @desc	Updates an existing item by Id
 * @route	PUT /api/v1/item/:itemId
 * @access	Super Admin
 */
const updateItem = asyncHandler(async (req, res) => {
	const { itemId } = req.params;

	const item = await Item.findById(itemId);
	if (!item) {
		res.status(StatusCodes.NOT_FOUND);
		throw new Error(`Item with ID ${itemId} not found.`);
	}

	const { name } = req.body;

	if (name && name !== item.name) {
	}
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
	getItemById,
	deleteItem,
};
