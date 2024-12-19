const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		effect: {
			type: String,
			required: true,
		},
		// Will be dynamic
		value: {
			currentValue: {
				type: Number,
				default: 1,
			},
			dailyChange: {
				type: Number,
				default: 0,
			},
			monthlyChange: {
				type: Number,
				default: 0,
			},
			yearlyChange: {
				type: Number,
				default: 0,
			},
			vender: {
				// Not dynamic
				venderBuy: {
					type: Number,
					default: 10,
				},
				// Not dynamic
				venderSell: {
					type: Number,
					default: 1,
				},
				totalVendered: {
					type: Number,
					default: 0,
				},
				balanceOfPaymentsTotal: {
					type: Number,
					default: 0,
				},
			},
		},
		circulation: {
			type: Number,
			default: 0,
		},
		category: {
			type: String,
			enum: [
				"Primary Weapon",
				"Secondary Weapon",
				"Melee Weapon",
				"Consumable Weapon",
				"Armour",
				"Garments",
				"Medical",
				"Drugs",
				"Packs",
				"Tools",
				"Materials",
				"Miscellaneous",
			],
		},
		equippable: {
			type: Boolean,
			default: false,
		},
		baseArmourValue: {
			type: Number,
		},
		damage: {
			type: Number,
		},
		baseChanceToHit: {
			type: Number,
			min: [0, "Cannot have a negative base chance to hit."],
		},
		consumable: {
			type: Boolean,
			default: false,
		},
		stackable: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
