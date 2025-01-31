const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
			index: true,
		},
		items: [
			{
				item: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Item",
					required: true,
				},
				// If the item is non-stackable, this should just be one and no larger
				quantity: {
					type: Number,
					required: true,
					min: 1,
				},
				// This will only exist for non-stackable items, particularly weapons (excluding consumable weapons)
				progression: {
					level: {
						type: Number,
					},
					xp: {
						type: Number,
					},
				},
				// This will be baked into the item but will be only for weapons (excluding consumable) and armour. Tier will depend on which loot table the item hits and this will increase the items output
				tier: {
					type: Number,
					min: 1,
					max: 9,
					default: 1,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

const Inventory = mongoose.model("Inventory", InventorySchema);

module.exports = Inventory;
