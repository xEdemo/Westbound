const { StatusCodes } = require("http-status-codes");
const { Item, Enum, User } = require("../../models");
const asyncHandler = require("express-async-handler");
const { uploadImageToCloudinary } = require("../../middleware/upload.js");
const cloudinary = require("../../config/cloudinary.js");
const { autoParseAndClean } = require("../../utils/autoParseAndClean.js");

/**
 * @desc	Create an item
 * @route	POST /api/v1/item
 * @access	Super Admin
 */
const createItem = asyncHandler(async (req, res) => {
	const userId = req.user._id.toString();

	const user = await User.findById(userId);
	if (!user) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`No user found with id ${userId}.`);
	}

	const cleanedData = autoParseAndClean(req.body);

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
	} = cleanedData;

	if (!comments) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`Comments are required. Please detail your changes.`);
	}

	if (!name || !description || !venderBuy || !venderSell || !category) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`Please fill out all required fields.`);
	}

	const itemSlot = await Enum.findOne({ category: "itemSlot" });
	if (slot && !itemSlot.names.some((n) => n.name === slot)) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`Item slot of '${slot}' was not found in the enum.`);
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
		effect &&
		effect.type &&
		!itemEffectType.names.some((n) => n.name === effect.type)
	) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(
			`Item effect type of ${effect?.type} was not found in the enum.`
		);
	}

	const itemWeaponType = await Enum.findOne({ category: "itemWeaponType" });
	if (
		weapon &&
		weapon.type &&
		!itemWeaponType.names.some(
			(n) => n.name === weapon.type && n.parent === category
		)
	) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(
			`Item weapon type of ${weapon?.type} was not found in the enum.`
		);
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

	if (
		(effect && effect.applyChance > 100) ||
		(effect && effect.applyChance < 1)
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
		slot,
		isConsumable,
		isStackable,
		isTradeable,
		isQuestItem,
		isEquippable,
		armour,
		effect,
		category,
		weapon,
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
	const userId = req.user._id.toString();

	const user = await User.findById(userId);
	if (!user) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`No user found with id ${userId}.`);
	}

	const item = await Item.findById(itemId);
	if (!item) {
		res.status(StatusCodes.NOT_FOUND);
		throw new Error(`Item with ID ${itemId} not found.`);
	}

	const [
		itemSlot,
		itemCategory,
		itemEffectType,
		itemWeaponType,
		itemWeaponDamageType,
	] = await Promise.all([
		Enum.findOne({ category: "itemSlot" }),
		Enum.findOne({ category: "itemCategory" }),
		Enum.findOne({ category: "itemEffectType" }),
		Enum.findOne({ category: "itemWeaponType" }),
		Enum.findOne({ category: "itemWeaponDamageType" }),
	]);

	const cleanedData = autoParseAndClean(req.body);
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
	} = cleanedData;

	if (!comments) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`Comments are required. Please detail your changes.`);
	}

	// --- Unique field: name ---
	if (typeof name !== "undefined" && name !== item.name) {
		const duplicate = await Item.findOne({ name });
		if (duplicate) {
			res.status(StatusCodes.CONFLICT);
			throw new Error(
				`An item with the name '${name}' already exists. This field should be unique.`
			);
		}
		item.name = name;
	}

	// --- Update simple fields ---
	if (
		typeof description !== "undefined" &&
		description !== item.description
	) {
		item.description = description;
	}
	if (
		typeof venderBuy !== "undefined" &&
		venderBuy !== item.value.vender.venderBuy &&
		venderBuy >= 1
	) {
		item.value.vender.venderBuy = venderBuy;
	}
	if (
		typeof venderSell !== "undefined" &&
		venderSell !== item.value.vender.venderSell &&
		venderSell >= 1
	) {
		item.value.vender.venderSell = venderSell;
	}

	// --- Validate and update enums for slot ---
	if (typeof slot !== "undefined" && slot !== item.slot) {
		if (!itemSlot.names.some((n) => n.name === slot)) {
			res.status(StatusCodes.BAD_REQUEST);
			throw new Error(
				`Item slot of '${slot}' was not found in the enum.`
			);
		}
		item.slot = slot;
	}

	// --- Update boolean flags if provided ---
	if (
		typeof isConsumable !== "undefined" &&
		isConsumable !== item.isConsumable
	) {
		item.isConsumable = isConsumable;
	}
	if (
		typeof isStackable !== "undefined" &&
		isStackable !== item.isStackable
	) {
		item.isStackable = isStackable;
	}
	if (
		typeof isTradeable !== "undefined" &&
		isTradeable !== item.isTradeable
	) {
		item.isTradeable = isTradeable;
	}
	if (
		typeof isQuestItem !== "undefined" &&
		isQuestItem !== item.isQuestItem
	) {
		item.isQuestItem = isQuestItem;
	}
	if (
		typeof isEquippable !== "undefined" &&
		isEquippable !== item.isEquippable
	) {
		item.isEquippable = isEquippable;
	}

	// --- Update category with enum check ---
	if (category && category !== item.category) {
		if (!itemCategory.names.some((n) => n.name === category)) {
			res.status(StatusCodes.BAD_REQUEST);
			throw new Error(
				`Item category of '${category}' was not found in the enum.`
			);
		}
		item.category = category;
	}

	// --- Update nested effect object ---
	if (effect) {
		if (effect.type && (!item.effect || effect.type !== item.effect.type)) {
			if (!itemEffectType.names.some((n) => n.name === effect.type)) {
				res.status(StatusCodes.BAD_REQUEST);
				throw new Error(
					`Item effect type of '${effect.type}' was not found in the enum.`
				);
			}
			item.effect.type = effect.type;
		}
		if (
			effect.applyChance &&
			(!item.effect || effect.applyChance !== item.effect.applyChance) &&
			effect.applyChance >= 1 &&
			effect.applyChance <= 100
		) {
			item.effect.applyChance = effect.applyChance;
		}
		if (
			effect.description &&
			(!item.effect || effect.description !== item.effect.description)
		) {
			item.effect.description = effect.description;
		}
		if (
			effect.amount &&
			(!item.effect || effect.amount !== item.effect.amount) &&
			effect.amount >= 1
		) {
			item.effect.amount = effect.amount;
		}
		if (
			effect.duration?.value &&
			(!item.effect ||
				effect.duration.value !== item.effect.duration.value) &&
			effect.duration.value >= 1
		) {
			item.effect.duration.value = effect.duration.value;
		}
		// Need to validate this enum
		if (
			effect.duration?.unit &&
			(!item.effect || effect.duration.unit !== item.effect.duration.unit)
		) {
			item.effect.duration.unit = effect.duration.unit;
		}
		if (
			effect.cooldown?.value &&
			(!item.effect ||
				effect.cooldown.value !== item.effect.cooldown.value) &&
			effect.cooldown.value >= 1
		) {
			item.effect.cooldown.value = effect.cooldown.value;
		}
		// Need to validate this enum
		if (
			effect.cooldown?.unit &&
			(!item.effect || effect.cooldown.unit !== item.effect.cooldown.unit)
		) {
			item.effect.cooldown.unit = effect.cooldown.unit;
		}
	}

	// --- Update armour object ---
	if (armour) {
		if (
			armour.rating &&
			(!item.armour || armour.rating !== item.armour.rating) &&
			armour.rating >= 1
		) {
			item.armour.rating = armour.rating;
		}
	}

	// --- Update weapon object ---
	if (weapon) {
		if (weapon.type && (!item.weapon || weapon.type !== item.weapon.type)) {
			if (!itemWeaponType.names.some((n) => n.name === weapon.type)) {
				res.status(StatusCodes.BAD_REQUEST);
				throw new Error(
					`Weapon type of '${weapon.type}' was not found in the enum.`
				);
			}
			item.weapon.type = weapon.type;
		}
		if (
			weapon.accuracy &&
			(!item.weapon || weapon.accuracy !== item.weapon.accuracy) &&
			weapon.accuracy >= 0
		) {
			item.weapon.accuracy = weapon.accuracy;
		}
		if (
			weapon.damage?.type &&
			(!item.weapon.damage ||
				weapon.damage.type !== item.weapon.damage.type)
		) {
			if (
				!itemWeaponDamageType.names.some(
					(n) => n.name === weapon.damage.type
				)
			) {
				res.status(StatusCodes.BAD_REQUEST);
				throw new Error(
					`Weapon damage type of '${weapon.damage.type}' was not found in the enum.`
				);
			}
			item.weapon.damage.type = weapon.damage.type;
		}
		if (
			weapon.damage?.amount &&
			(!item.weapon.damage ||
				weapon.damage.amount !== item.weapon.damage.amount) &&
			weapon.damage.amount >= 1
		) {
			item.weapon.damage.amount = weapon.damage.amount;
		}
		if (
			weapon.ammunition?.type &&
			(!item.weapon.ammunition ||
				weapon.ammunition.type !== item.weapon.ammunition.type)
		) {
			item.weapon.ammunition.type = weapon.ammunition.type;
		}
		if (
			weapon.ammunition?.expenditure &&
			typeof weapon.ammunition.expenditure.high !== "undefined" &&
			weapon.ammunition.expenditure.high !==
				item.weapon.ammunition.expenditure.high &&
			weapon.ammunition.expenditure.high >= 1 &&
			weapon.ammunition.expenditure.high <=
				weapon.ammunition.expenditure.low
		) {
			item.weapon.ammunition.expenditure.high =
				weapon.ammunition.expenditure.high;
		}
		if (
			weapon.ammunition?.expenditure &&
			typeof weapon.ammunition.expenditure.low !== "undefined" &&
			weapon.ammunition.expenditure.low !==
				item.weapon.ammunition.expenditure.low &&
			weapon.ammunition.expenditure.low >= 1 &&
			weapon.ammunition.expenditure.low <=
				weapon.ammunition.expenditure.high
		) {
			item.weapon.ammunition.expenditure.low =
				weapon.ammunition.expenditure.low;
		}
	}

	item.updatedBy.push({
		user: user._id,
		date: new Date().toISOString(),
		comments,
	});

	// --- Process image update ---
	if (req.file) {
		if (item.image && item.image.publicId) {
			try {
				await cloudinary.uploader.destroy(item.image.publicId);
			} catch (error) {
				console.error("Cloudinary Error:", error);
				res.status(StatusCodes.INTERNAL_SERVER_ERROR);
				throw new Error("Failed to delete item image from Cloudinary.");
			}
		}
		const { url, publicId } = await uploadImageToCloudinary(
			req.file,
			`items/${req.body.category || item.category}`
		);
		item.image = { url, publicId };
	}

	await item.save();

	res.status(StatusCodes.OK).json({ item });
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
	updateItem,
	deleteItem,
};
