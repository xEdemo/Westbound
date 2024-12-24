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
				slot: {
					type: String,
					enum: [
						"Helmet",
						"Chest",
						"Legs",
						"Boots",
						"Gloves",
						"Shawl",
						"Face",
						"Belt",
					],
				},
				condition: {
					type: Number,
					min: [0, "Must be a positive number"], // frontned handles rusty etc
					max: [100, " Must not exceed 100"], // frontend handles qual etc
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
						secondaryWeapon: {
							name: {
								type: String,
								enum: ["Handgun", "Bows", ""],
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
						Garments: {
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
						Medical: {
							name: {
								type: String,
								enum: [
									"bandage",       // A basic bandage used to stop bleeding
									"medicine",      // General medicine to heal or cure ailments
									"tonic",         // Healing tonics or potions for quick recovery
									"antidote",      // A remedy for poisons or toxins
									"syringe",       // A syringe for medical injection (e.g., vaccine, stimulant)
									"painkiller",    // Painkillers for reducing damage effects
									"firstAidKit",   // A kit containing a variety of medical supplies
									"salve",         // Ointments or salves used to heal wounds
									"bandolier",     // A medical bandolier to carry multiple medical supplies
									"healingHerb",   // Special herbs used for natural healing
									"splint",        // A splint used to stabilize broken limbs
								],
							},
							properties: {
								healingAmount: {
									type: Number,
									required: true, // The amount of health or status the medical item restores
								},
								material: {
									type: String,
									enum: [
										"cloth",    // Used for bandages and wraps
										"herb",     // Used for natural medicine like healing herbs
										"metal",    // Used for syringes or other medical tools
										"glass",    // Used for syringes or tonic bottles
										"leather",  // Used for medical pouches or carrying packs
										"plastic",  // Used for first aid kits or packaging
										"stone",    // Used for primitive healing tools, e.g., splints
										"wood",     // Used for creating simple splints or healing implements
									],
								},
								usageType: {
									type: String,
									enum: [
										"instant",     // Heals immediately upon use
										"overTime",    // Healing occurs over a period of time (e.g., herbal teas)
										"temporary",   // Temporary effects (e.g., painkillers, antidotes)
										"external",    // Used for external wounds (e.g., bandages)
										"internal",    // Used for internal wounds or ailments (e.g., syringes)
										"consumable",  // Used up after one use (e.g., tonics, salves)
									],
								},
								effectType: {
									type: String,
									enum: [
										"health",        // Restores health points or hits
										"stamina",       // Restores stamina or energy
										"toxicity",      // Removes poison or toxins
										"painRelief",    // Reduces pain effects or temporary debuffs
										"statusEffect",  // Cures or mitigates other status effects (e.g., burns)
										"buff",          // Temporary buffs to stats (e.g., increased speed, resistance)
									],
								},
								duration: {
									type: String,
									enum: [
										"instant",       // Effects take place immediately
										"short",         // Effects last for a short period of time
										"medium",        // Effects last for a medium period of time
										"long",          // Effects last for a longer period of time
									],
								},
								rarity: {
									type: String,
									enum: [
										"common",    // Widely available medical supplies
										"uncommon",  // Slightly rarer medical supplies
										"rare",      // Rare or expensive medical supplies
										"legendary", // Legendary medical supplies, possibly with magical or unique properties
									],
								},
								stackable: {
									type: Boolean,
									default: true, // Determines if the medical item can be stacked in the inventory
								},
							},
						},
						Packs: {
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
						Tools: {
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
						Materials: {
							name: {
								type: String,
								enum: [
									"Metals", // Metalworking skill
									"Harvests", // Agriculture skilling (farming)
									"Lumbers", // Lumbering skill (woodcutting)
									"Fabrics", // Textile crafting
									"Leathers", // Leatherworking skill
									"Hunting", // Hunting skill (animal pelts, bones)
									"Fishing", // Fishing skill
									"Alchemy", // Alchemy skill (potion-making, chemicals)
									"Lockpicking", // Lockpicking skill (tools and methods)
									"Mining", // Mining skill (stone, gems, ores)
									"Construction", // Construction skill (building and repairing)
									"Handloading", // Handloading skill (ammunition crafting)
									"Tanning", // Leather and hide processing skill
									"Blacksmithing", // Advanced metalworking and weaponsmithing
									"Pottery", // Clay crafting
									"Woodworking", // Creating tools, furniture, barrels, etc.
									"Herbalism", // Gathering and using herbs for various crafts
								],
							},
							properties: {
								material: {
									type: String,
									enum: [
										// Metals
										"Iron",
										"Steel ",
										"Gold ",
										"Silver ",
										"Copper ",
										"Bronze ",
										"Tin",
										"Lead",

										// Fabric and Textile
										"Cotton", // >
										"Wool", // >
										"Linen", // >
										"Silk", // >
										"Canvas", // >

										// Wood
										"Oak",
										"Pine",
										"Mahogany",
										"Cedar",
										"Elm",

										// Leather
										"Cowhide",
										"Deerskin",
										"Buffalo Hide",
										"Sheepskin",

										// Stones and Minerals
										"Granite",
										"Marble",
										"Limestone",
										"Slate",
										"Coal",
										"Saltpeter",

										// Herbal and Natural
										"Aloe Vera",
										"Tobacco Leaves",
										"Cactus",
										"Wildflowers",
										"Moss",

										// Gemstones
										"Ruby",
										"Emerald",
										"Sapphire",
										"Diamond",
										"Amethyst",

										// Food and Crops
										"Corn",
										"Wheat",
										"Barley",
										"Tomato",
										"Potato",
										"Beans",

										// Chemicals and Explosives
										"Sulfur",
										"Gunpowder",
										"Charcoal",
										"Nitrate",
										"Acid",

										// Others
										"Clay",
										"Ivory",
										"Animal Bones",
										"Feathers",
									],
								},
								uses: {
									type: String,
									enum: [
										"Crafting", // General crafting
										"Building", // Construction purposes
										"Weapons", // Crafting materials for weapons
										"Armor", // Crafting materials for armor
										"Tools", // Crafting materials for tools
										"Alchemy", // Crafting potions, chemicals, or explosives
										"Trade", // Trade or bartering material
										"Decorative", // Used for decoration or luxury items
										"Cooking", // Used in food production or preparation
										"Medical", // Used for healing or medicine
										"Fuel", // Used in heating or running engines
										"Ammo", // Ammunition crafting
										"Explosives", // Making dynamite, bombs, etc.
										"Hunting", // Used in trapping or hunting equipment
										"Building Materials", // Construction and infrastructure
										"Textiles", // For crafting clothes, tents, or sails
										"Leatherworking", // Crafting saddles, bags, etc.
									],
								},
								rarity: {
									type: String,
									enum: [
										"Common", // Easy to find, inexpensive
										"Uncommon", // Rare, requires effort to gather
										"Rare", // Difficult to find, valuable
										"Epic", // Very difficult to find, highly valuable
										"Legendary", // Almost impossible to find, unique value
									],
								},
							},
						},
						Misc: {
							name: {
								type: String,
								enum: [
									"survival",
									"camping",
									"navigation",
									"personal effects",
									"books",
									"trinkets",
									"comfort",
									"wantedPosters",
									"",
									"",
								],
							},
							properties: {
								legalStatus: {
									type: String,
									enum: ["Illegal", "Restricted", "Legal"],
								},
							},
						},
						armour: {
							name: {
								type: String,
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
