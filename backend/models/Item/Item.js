const mongoose = require("mongoose"); //TODO: Add source var to all items as to where it can be located on various markets word to timbs

const ItemSchema = new mongoose.Schema(
	// beginning of base Vars
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
			}
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
				},
				// Not dynamic; should be about 20% less than buy
				venderSell: {
					type: Number,
					default: 8,
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
				message: "Slot is required when the item is equippable. Also, ensure that desired slot is in itemSlot Enum.",
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
				enum: ["heal", "poison", "burn", "pierce"],
			},
			description: {
				type: String,
			},
			amount: {
				// How much the user will get healed, damage over time, etc.
				type: Number,
			},
			duration: {
				value: {
					type: Number,
				},
				unit: {
					type: String,
					enum: ["s", "min", "h", "day"],
				},
			},
			cooldown: {
				value: {
					type: Number,
				},
				unit: {
					type: String,
					enum: ["s", "min", "h", "day"],
				},
			},
		},
		armour: {
			rating: {
				type: Number,
			},
		},
		weapon: {
			type: {
				type: String,
				validate: {
					validator: async function (value) {
						const { Enum } = require("../");
						const enumerator = await Enum.findOne({
							category: "weaponType",
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
			noiseLevel: {
				type: Number,
				min: 0,
				max: 100,
			},
			accuracy: {
				type: Number,
				min: [0, "Cannot have negative accuracy."],
				max: 100,
			},
			damage: {
				type: {
					type: String,
					enum: [
						"piercing",
						"bludgeoning",
						"slashing",
						"barbed",
						"ballistic",
						"explosive",
						"gatling",
						"burning",
						"corrosive",
						"shock",
						"concussive",
					],
					validate: {
						validator: function () {
							if (this.category.includes("Weapon")) {
								return true;
							}
							return false;
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
					},
					low: {
						type: Number,
					},
				},
			},
			// Level can modify the weapons accuracy/damage amount
			// level: {
			// 	type: Number,
			// },
			// xp: {
			// 	type: Number,
			// },
			kills: {
				type: Number,
				default: 0,
			},
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
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
