const mongoose = require("mongoose"); //TODO: Add source var to all items as to where it can be located on various markets word to timbs

const { itemCategory } = require("../utils/enum.js");

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
			type: String,
			required: true,
		},
		effect: {
			type: String,
			required: true,
		},
		// tier: {
		// 	type: String,
		// },
		// future dynamic handling of economics > math function in controller
		value: {
			circulation: {
				type: Number,
				default: 0,
			},
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
					required: true,
				},
				// Not dynamic
				venderSell: {
					type: Number,
					required: true,
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
					max: 100,
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
			// cat of item
			category: {
				type: String,
				enum: itemCategory,
			},
			subCategory: {
				consumableWeapon: {
					type: {
						type: String,
						enum: [
							"Throwable",
							"Explosive",
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
						armingTime: {
							type: Number,
						},
						antidoteAvailable: {
							type: Boolean,
						},
					},
				},
				primaryWeapon: {
					// name: {
					// 	type: String, // add starter wepaons comment
					// 	enum: [
					// 		"Winchester Model 1873", //Repeater
					// 		"Spencer Repeating Rifle", //Repeater
					// 		"Henry Repeating Rifle", //Repeater
					// 		"Springfield Model 1873", //Rifle
					// 		"Sharps Model 1874", //Rifle
					// 		"Remington Rolling Block Rifle", //Rifle
					// 		"Plains Recurve Bow", //bow
					// 		"Longbow", //bow
					// 		"Flatbow", //bow
					// 		"Coach Gun", //shotgun
					// 		"Lever-Action Shotgun", //shotgun
					// 		"Sawed-Off Shotgun", //shotgun
					// 		"Kentucky Flintlock Musket", //musket
					// 		"Springfield Model 1842", //musket
					// 		"Harper's Ferry Musket", //musket
					// 		"Ranger's Pocket Shot", //slingshot
					// 		"Wooden Slingbow", //slingshot
					// 		"Iron slingshot", //slingshot
					// 	],
					// },
					type: {
						type: String,
						enum: [
							"Repeater",
							"Rifle",
							"Bow",
							"Shotgun",
							"Musket", // starter weapons, mainly outdated but still used by settlers
							"Slingshot",
						],
					},
					properties: {
						//TODO: Decide if i want this in here
						damageType: {
							type: String,
							enum: [
								"Piercing",
								"Bludgeoning",
								"Slashing",
								"Impact",
								"",
								"",
							],
						},
						// material: {
						// 	// Possibly expand these subcats to include the types
						// 	type: String,
						// 	enum: ["", "", ""],
						// },
						ammunitionType: {
							type: String,
							enum: [
								"Cartidge", // rifles
								"Shell", // shotguns
								"Black Powder", // muskets
								"Arrows", //bow and arrow and crossbow
							],
						},
					},
				},
				secondaryWeapon: {
					// name: {
					// 	type: String,
					// 	enum: [
					// 		"Pistols",
					// 		"small firearms", // sawed off shotguns, pepperbox rifles
					// 		"improvised firearms",
					// 	],
					// },
					type: {
						type: String,
						enum: [
							"Pistols",
							"Small Firearms", // sawed off shotguns, pepperbox rifles
							"Improvised Firearms",
						],
					},
					properties: {
						// TODO:
						damageType: {
							type: String,
							enum: [
								"Piercing",
								"Bludgeoning",
								"Impact",
								"Slashing",
							],
						},
						// material: {
						// 	// TODO: Make it cross reference materials
						// 	type: String,
						// 	enum: ["Iron", "Steel", "Wood"],
						// },
						ammunitionType: {
							type: String,
							enum: ["Cartidge", "Shell", "Black Powder"],
						},
					},
				},
				meleeWeapon: {
					// name: {
					// 	type: String,
					// 	enum: [
					// 		[
					// 			"Bowie Knife", // A large, curved knife used for close combat and self-defense, popular during the Wild West period.
					// 			"Tomahawk", // A hand axe, often used by Native Americans for throwing or close-range combat, and also by settlers.
					// 			"Machete", // A broad-bladed knife used for cutting vegetation or as a combat weapon in the Wild West.
					// 			"Cutlass", // A short, curved sword used primarily by sailors and sometimes in hand-to-hand combat in the Wild West.

					// 			"Sledgehammer", // A heavy hammer, often used in construction, but could be used as a powerful melee weapon in brawls.
					// 			"Club", // A simple, blunt weapon made from wood or metal, used for striking during fights or brawls.
					// 			"Billiard Cue Stick", // Often used in saloons for both its intended purpose (billiards) and as an improvised weapon in disputes.
					// 			"Cavalry Mace", // A spiked weapon used by cavalry soldiers, designed to deal bludgeoning damage in close combat.

					// 			"Cavalry Sabre", // A curved sword used by mounted soldiers and cavalrymen, ideal for slashing and thrusting.
					// 			"Dagger", // A short, pointed weapon used for stabbing in close-range combat.
					// 			"Rancher’s Spear", // A long spear used by ranchers for herding cattle, which could also be used in combat for thrusting.
					// 			"Dirk", // A long, stabbing knife used as a secondary weapon for thrusting in close combat.

					// 			"Broken Bottle", // A bottle used as an improvised weapon, with the glass shards being used to cut or stab.
					// 			"Horse Whip", // A whip used for controlling horses, but also utilized in combat for striking opponents at a distance.
					// 			"Rancher’s Lasso", // A rope used to catch livestock but can be used in a fight to entangle or immobilize enemies.
					// 			"Canteen", // A water container that could be swung or used as a makeshift bludgeoning weapon in desperate situations.
					// 		],
					// 	],
					// },
					type: {
						// TODO: get rud if, want many melee weapons
						type: String,
						enum: [
							"Blades",
							"Blunt",
							"Thrusting",
							"Specialty", // TODO : add more but need a natural balance between the others
						],
					},
					properties: {
						damageType: {
							type: String, // TODO: add more but need balancing with others
							enum: [
								"Piercing",
								"Bludgeoning",
								"Impact",
								"Slashing",
							],
						},
						// material: {
						// 	type: String,
						// 	enum: ["", "", ""],
						// },
					},
				},
				garments: {
					// leave garments out for now
					// name: {
					// 	type: String,
					// 	enum: ["", "", ""],
					// },
					type: {
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
				medical: {
					// name: {
					// 	type: String,
					// 	enum: [
					// 		// Wound Care
					// 		"bandage", // A basic bandage used to stop bleeding
					// 		"salve", // Ointments or salves used to heal wounds
					// 		"splint", // A splint used to stabilize broken limbs
					// 		//Restorative

					// 		"medicine", // General medicine to heal or cure ailments
					// 		"tonic", // Healing tonics or potions for quick recovery
					// 		"healingHerb", // Special herbs used for natural healing
					// 		// Pain Relief

					// 		"antidote", // A remedy for poisons or toxins
					// 		"syringe", // A syringe for medical injection (e.g., vaccine, stimulant)
					// 		"painkiller", // Painkillers for reducing damage effects
					// 		"firstAidKit", // A kit containing a variety of medical supplies
					// 		// Carrier

					// 		"kit", // A compact, portable kit containing basic medical supplies
					// 		"pouch", // A small pouch for carrying essential medical items or herbs
					// 		"satchel", // A small bag used to carry medical supplies or other essentials
					// 		"bandolier", // A medical bandolier to carry multiple medical supplies for easy access during an emergency
					// 	],
					// },
					type: {
						type: String,
						enum: [
							"Wound Care",
							"Restorative",
							"Pain Relief",
							"Carrier",
						],
					},
					properties: {
						healingAmount: {
							type: Number,
						},
						// material: {
						// 	type: String,
						// 	enum: [],
						// },
						usageType: {
							type: String,
							enum: [
								"instant", // used and works instantly - PAIN RELIEF
								"overTime", // used and heals gradually - RESTORATIVE
								"temporary", // not used - CARRIER
								"consumable", // used after one use - WOUND CARE
							],
						},
						effectType: {
							type: String,
							enum: [
								"health", // Restores health points or hits
								"stamina", // Restores stamina or energy
								"toxicity", // Removes poison or toxins
								"painRelief", // Reduces pain effects or temporary debuffs
								"statusEffect", // Cures or mitigates other status effects (e.g., burns)
								"buff", // Temporary buffs to stats (e.g., increased speed, resistance)
							],
						},
						duration: {
							// used for tiers of medicine inside a SUBCAT
							type: String,
							enum: [
								"instant", // Effects take place immediately
								"short", // Effects last for a short period of time
								"medium", // Effects last for a medium period of time
								"long", // Effects last for a longer period of time
							],
						},
						stackable: {
							type: Boolean,
						},
					},
				},
				supplies: {
					// leave out for now
					// name: {
					// 	type: String,
					// 	enum: ["", "", ""],
					// },
					properties: {
						damageType: {
							type: String,
							enum: ["", "", ""],
						},
						// material: {
						// 	type: String,
						// 	enum: ["", "", ""],
						// },
						ammunitionType: {
							type: String,
							enum: ["", "", ""],
						},
					},
				},
				tools: {
					// name: {
					// 	type: String,
					// 	enum: [],
					// },
					type: {
						type: String,
						enum: [
							//TODO: Where the fuck do Gemstones come into play?
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
								//TODO:
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
								// TODO: Needs rewording retard
								"Common", // Easy to find, inexpensive
								"Uncommon", // Rare, requires effort to gather
								"Rare", // Difficult to find, valuable
								"Epic", // Very difficult to find, highly valuable
								"Legendary", // Almost impossible to find, unique value
							],
						},
					},
				},
				materials: {
					type: {
						type: String,
						enum: ["wood, iron, steel"],
					},
					properties: {

					},
				},
				miscellaneous: {
					// name: {
					// 	type: String,
					// 	enum: [
					// 		// survival
					// 		"Firestarter Kit",
					// 		"First Aid Kit",
					// 		"Survival Knife",
					// 		"Water Purification Tablets",
					// 		"Emergency Blanket",
					// 		"Compass",
					// 		"Shelter Tarp",
					// 		"Multi-tool",
					// 		"Rope",
					// 		"Whistle",

					// 		//camping
					// 		"Sleeping Bag",
					// 		"Tent",
					// 		"Camping Stove",
					// 		"Cooking Pot",
					// 		"Camping Chair",
					// 		"Portable Lantern",
					// 		"Camping Hammock",
					// 		"Fire Pit",
					// 		"Cooler",
					// 		"Water Bottle",

					// 		//navigation
					// 		"Compass",
					// 		"Map of the Region",
					// 		"GPS Device",
					// 		"Trail Markers",
					// 		"Altimeter",
					// 		"Binoculars",
					// 		"Travel Guide",
					// 		"Ruler",
					// 		"Protractor",
					// 		"Navigation Journal",

					// 		//personal effects
					// 		"Pocket Knife",
					// 		"Watch",
					// 		"Flashlight",
					// 		"Sunglasses",
					// 		"Notebook",
					// 		"Pen",
					// 		"Hat",
					// 		"Wallet",
					// 		"Bandana",
					// 		"Smartphone",

					// 		//books
					// 		"Survival Guide",
					// 		"Camping Tips and Tricks",
					// 		"Wilderness First Aid",
					// 		"The Complete Outdoor Adventure Guide",
					// 		"Trail Recipes",
					// 		"Animal Tracks Identification",
					// 		"Field Guide to Plants",
					// 		"The History of Exploration",
					// 		"Emergency Preparedness Handbook",
					// 		"Astronomy for Beginners",

					// 		//trinkets
					// 		"Amulet",
					// 		"Coin Collection",
					// 		"Lucky Charm",
					// 		"Wooden Figurine",
					// 		"Beaded Necklace",
					// 		"Hand-carved Token",
					// 		"Wristband",
					// 		"Engraved Keychain",
					// 		"Postcard",
					// 		"Handmade Bracelet",

					// 		//comfort
					// 		"Fleece Blanket",
					// 		"Pillow",
					// 		"Thermal Socks",
					// 		"Beanie",
					// 		"Slippers",
					// 		"Camping Mattress",
					// 		"Comfortable Gloves",
					// 		"Portable Fan",
					// 		"Cushion",
					// 		"Travel Mug",

					// 		//wantedPosters
					// 		"Wanted: John Doe, Dead or Alive",
					// 		"Wanted: Jane Smith, For Theft",
					// 		"Wanted: The Crimson Bandit",
					// 		"Wanted: Elusive Thief, Reward Offered",
					// 		"Wanted: Mysterious Fugitive",
					// 		"Wanted: Local Criminals",
					// 		"Wanted: Known Outlaw Gang",
					// 		"Wanted: Public Enemy #1",
					// 		"Wanted: Fugitive from Justice",
					// 		"Wanted: Wanted for Robbery",
					// 	],
					// },
					type: {
						type: String,
						enum: [
							"Survival",
							"Camping",
							"Navigation",
							"Personal Effects",
							"Books",
							"Trinkets",
							"Comfort",
							"Wanted Posters",
						],
					}, // TODO: Requires more knowledge, do later
					// properties: {
					// 	legalStatus: {
					// 		type: String,
					// 		enum: ["Illegal", "Restricted", "Legal"],
					// 	},
					// },
				},
				armour: {
					// name: {
					// 	type: String,
					// },
					properties: {
						// damageType: {
						// 	type: String,
						// 	enum: ["", "", ""],
						// },
						// material: {
						// 	type: String,
						// 	enum: ["", "", ""],
						// },
						// ammunitionType: {
						// 	type: String,
						// 	enum: ["", "", ""],
						// },
					},
				},
			},
		},
	},
	{ timestamps: true }
);

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
