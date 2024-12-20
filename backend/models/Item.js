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
		tier: {
			type: String,
			required: false,
		},

		// future dynamic handling of economics
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
		properties: {
			baseProperties: {
				equippable: {
					type: Boolean,
					default: false,
				},
				noiseLevel: {
					type: Number,
				},
				condition: {
					type: Number,
					min: [0,"Must be a positive number"], // frontned handles rusty etc
					max: [100, " Must not exceed 100"] // frontend handles qual etc
				},
				weight: {
					type: Number,
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
				subCategory: {
					consumableWeapon: {
						name: {
							type: String,
							enum: [
								"Throwable",
								"Roonie",
								"explosive",
								"Ammunition",
								"Poison",
								"Trap",
								"Distraction",
							],
						},
						properties: {
							effect: {
								type: String,
							},
							duration: {
								type: Number,
							},
							range: {
								type: Number,
							},
							modifier: {
								type: Number,
							},
							armingTime: {
								type: Number,
							},
							antidoteAvailable: {
								type: Boolean,
							},
						},
						primaryWeapon: {
							name: {
								type: String,
								enum: ["", "Rifle", "Shotgun"],
							},
							properties: {
								damageType: {
									type: String,
									enum: [
										"", 
										"", 
										""],
								},
								material: {
									type: String,
									enum: [
										"Iron", 
										"Steel", 
										"Wood"],
								},
								ammunitionType: {
									type: String,
									enum: [
										"Cartidge", 
										"Shell", 
										"Black Powder"],
								},
							},
						},
						secondaryWeapon: {
							name: {
								type: String,
								enum: [
									"Handgun", 
									"Bows", 
									""],
							},
							properties: {
								damageType: {
									type: String,
									enum: ["", "", ""],
								},
								material: {
									type: String,
									enum: ["Iron", "Steel", "Wood"],
								},
								ammunitionType: {
									type: String,
									enum: ["Cartidge", "Shell", "Black Powder"],
								},
							},
						},
						meleeWeapon: {
							name: {
								type: String,
								enum: [
									"Bladed",
									"Blunt",
									"Polearms", // TODO : add more but need a natural balance between the others
								],
							},
							properties: {
								damageType: {
									type: String, // TODO: add more but need balancing with others
									enum: ["", "", ""],
								},
								material: {
									type: String,
									enum: ["", "", ""],
								},
								ammunitionType: {
									type: String,
									enum: ["Cartidge", "Shell", "Black Powder"],
								},
							},
						},
						armour: {
							name: {
								type: String,
								enum: ["", "", ""],
							},
							properties: {
								damageType: {
									type: String,
									enum: ["", "", ""],
								},
								material: {
									type: String,
									enum: ["", "", ""],
								},
								ammunitionType: {
									type: String,
									enum: ["", "", ""],
								},
							},
						},
					},
				},
			},
		},
	},
	{ timestamps: true }
);

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
