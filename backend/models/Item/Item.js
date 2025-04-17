const mongoose = require("mongoose"); //TODO: Add source var to all items as to where it can be located on various markets word to timbs

const ItemSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		description: {
			type: String,
			required: true,
		},
		image: {
			url: {
				type: String,
				required: true,
			},
			publicId: {
				type: String,
				required: true,
			},
		},
		// Calculated every hour for every item
		circulation: {
			total: {
				type: Number,
				default: 0,
			},
			tier: {
				1: {
					type: Number,
					default: 0,
				},
				2: {
					type: Number,
					default: 0,
				},
				3: {
					type: Number,
					default: 0,
				},
				4: {
					type: Number,
					default: 0,
				},
				5: {
					type: Number,
					default: 0,
				},
				6: {
					type: Number,
					default: 0,
				},
				7: {
					type: Number,
					default: 0,
				},
				8: {
					type: Number,
					default: 0,
				},
				9: {
					type: Number,
					default: 0,
				},
			},
		},
		// future dynamic handling of economics > math function in controller
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
					min: 1,
				},
				// Not dynamic; should be about 20% less than buy
				venderSell: {
					type: Number,
					default: 8,
					min: 1,
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
		slot: {
			type: String,
			validate: {
				validator: async function (value) {
					const { Enum } = require("../");
					const enumerator = await Enum.findOne({
						category: "itemSlot",
					});
					if (!enumerator) {
						return false;
					}
					// If equippable is true, slot must be provided
					if (this.equippable && (!value || value.length === 0)) {
						return false;
					}
					return enumerator.names.some((n) => n.name === value);
				},
				message:
					"Slot is required when the item is equippable. Also, ensure that desired slot is in itemSlot Enum.",
			},
		},
		isConsumable: {
			type: Boolean,
			default: false,
		},
		isStackable: {
			type: Boolean,
			default: true,
		},
		isTradeable: {
			type: Boolean,
			default: true,
		},
		isQuestItem: {
			type: Boolean,
			default: false,
		},
		isEquippable: {
			type: Boolean,
			default: false,
		},
		category: {
			type: String,
			required: true,
			validate: {
				validator: async function (value) {
					const { Enum } = require("../");
					const enumerator = await Enum.findOne({
						category: "itemCategory",
					});
					if (!enumerator) {
						return false;
					}
					return enumerator.names.some((n) => n.name === value);
				},
				message: (props) => `${props.value} is not a valid category.`,
			},
		},
		effect: {
			type: {
				type: String,
				validate: {
					validator: async function (value) {
						const { Enum } = require("../");
						const enumerator = await Enum.findOne({
							category: "itemEffectType",
						});
						if (!enumerator) {
							return false;
						}
						return enumerator.names.some((n) => n.name === value);
					},
				},
			},
			applyChance: {
				type: Number,
				min: [
					1,
					"Apply chance for item effect must be equal to or greater than 1.",
				],
				max: [
					100,
					"Apply chance for item effect must be less than 100.",
				],
			},
			description: {
				type: String,
			},
			amount: {
				// How much the user will get healed, damage over time, etc.
				type: Number,
				min: 1,
			},
			duration: {
				value: {
					type: Number,
					min: 1,
				},
				unit: {
					type: String,
					enum: ["seconds", "minutes", "hours", "days", "months", "years"],
				},
			},
			cooldown: {
				value: {
					type: Number,
					min: 1,
				},
				unit: {
					type: String,
					enum: ["seconds", "minutes", "hours", "days", "months", "years"],
				},
			},
		},
		armour: {
			rating: {
				type: Number,
				min: 1,
			},
		},
		weapon: {
			type: {
				type: String,
				validate: {
					validator: async function (value) {
						const { Enum } = require("../");
						const enumerator = await Enum.findOne({
							category: "itemWeaponType",
						});

						if (!enumerator || !enumerator.names) {
							return false;
						}

						const validNames = enumerator.names.filter(
							(n) => n.parent === this.category
						);

						return validNames.some((n) => n.name === value);
					},
					message: (props) =>
						`${props.value} is not a valid weapon type.`,
				},
			},
			accuracy: {
				type: Number,
				min: [0, "Cannot have negative accuracy."],
			},
			damage: {
				type: {
					type: String,
					validate: {
						validator: async function (value) {
							const { Enum } = require("../");
							const enumerator = await Enum.findOne({
								category: "itemWeaponDamageType",
							});

							if (
								!enumerator ||
								!enumerator.names ||
								!this.category.includes("Weapon")
							) {
								return false;
							}

							return enumerator.names.some(
								(n) => n.name === value
							);
						},
						message:
							"Weapons or temp weapons must have a valid damage type.",
					},
				},
				amount: {
					type: Number,
					min: [1, "Damage amount must be at least 1."],
					validate: {
						validator: function () {
							if (this.category.includes("Weapon")) {
								return true;
							}
							return false;
						},
						message: "Weapons or temp weapons must have an amount.",
					},
				},
			},
			ammunition: {
				type: {
					type: [mongoose.Schema.Types.ObjectId],
					ref: "Item",
				},
				expenditure: {
					high: {
						type: Number,
						min: 1,
					},
					low: {
						type: Number,
						min: 1,
					},
				},
			},
			kills: {
				type: Number,
				default: 0,
			},
		},
		createdBy: {
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				required: true,
			},
			comments: {
				type: String,
			},
		},
		updatedBy: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
				},
				date: {
					type: Date,
				},
				comments: {
					type: String,
				},
				_id: false,
			},
		],
	},
	{ timestamps: true }
);

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
