const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Property Schema
const PropertySchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		type: {
			type: String,
			enum: [
				"Tent",
				"Cabin",
				"Shack",
				"House",
				"Ranch",
				"Farm",
				"Estate",
				"Mansion",
			],
			required: true,
		},
		cost: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
		amenities: [
			{
				properties: {
					buffs: {
						type: String,
					},
					nerfs: {
						type: String,
					},
					capacity: {},
				},

				// Basic Amenities (for simpler properties like tents and cabins):

				// Campfire: A basic campfire for cooking and light.
				// Basic Bed: A simple bed to rest in.
				// Water Source (Well/Stream): A nearby water source like a well or stream.
				// Fireplace: A small hearth for warmth and cooking.
				// Basic Furniture: Tables, chairs, and other basic furniture.
				// Storage Chest: For storing basic items.

				// Intermediate Amenities (for properties like shacks, houses, and small ranches):

				// Wood Stove: A stove for cooking and heating.
				// Garden Plot: A small space for growing crops.
				// Livestock Pen: A pen for keeping small animals (chickens, goats, etc.).
				// Stable: A shelter for horses or other livestock.
				// Outbuildings (Shed, Barn): Additional storage or farming buildings.
				// Cistern or Water Barrel: For collecting and storing rainwater.
				// Furniture Upgrade: Better quality tables, chairs, and storage.
				// Outhouse: A small outdoor toilet.

				// Advanced Amenities (for ranches, farms, and estates):

				// Large Barn: A spacious barn for livestock, tools, and storage.
				// Water Well: A self-sustaining well with a pump for consistent water supply.
				// Corral: A large fenced area for animals like cattle.
				// Workshop: A building or room for crafting, repairs, or business activities.
				// Animal Feeding Sheds: Shelters for feeding livestock.
				// Greenhouse: For growing crops in controlled conditions.
				// Guest House: A separate house for visitors or workers.
				// Laundry Area: Space to wash clothes and linens.
				// Tack Room: For storing horse gear and other tools.
				// Large Garden/Farm: Extensive plots for growing crops, herbs, or vegetables.

				// Luxury Amenities (for mansions and large estates):

				// Private Library: A room full of books for study or leisure.
				// Ornate Furnishings: High-end furniture, including velvet chairs, fine wood tables, etc.
				// Private Office: A dedicated space for business dealings or personal work.
				// Trophy Room: A room to display hunting trophies or valuable items.
				// Lush Garden: A beautifully designed garden with flowers, shrubs, and trees.
				// Servants' Quarters: Rooms or cabins for live-in staff.
				// Armory: A room or building to store weapons, tools, and armor.
				// Swimming Pool: A luxury feature for relaxation and leisure.
				// Covered Porch: A large, comfortable porch or veranda for sitting outside.
				// Wine Cellar: A cool, secure space for storing fine wines and spirits.
				// Ballroom: A grand hall for hosting parties and events.
				// Entertainment Room: A space for playing games, cards, or even listening to music.

				// Additional Functional Amenities (across different property tiers):

				// Fence: To mark boundaries and protect the property.
				// Solar Panels: For providing electricity in more advanced properties.
				// Woodworking Area: A space for crafting furniture or tools.
				// Metalworking Area: For creating metal tools or building structures.
				// Farming Equipment: Implements for plowing, seeding, and harvesting crops.
				// Communication (Telegraph): A system for long-distance communication in later-tier properties.

				// Example Property Amenities by Type:

				// Tent: Campfire, Basic Bed
				// Cabin: Campfire, Basic Bed, Water Source, Small Furniture
				// Shack: Wood Stove, Livestock Pen, Outhouse, Basic Furniture
				// House: Wood Stove, Garden Plot, Water Well, Stable
				// Ranch: Large Barn, Workshop, Livestock Corral, Water Well
				// Farm: Greenhouse, Animal Feeding Sheds, Large Garden, Workshop
				// Estate: Trophy Room, Private Library, Guest House, Large Garden
				// Mansion: Ornate Furnishings, Ballroom, Wine Cellar, Private Office
			},
		],
		isAvailableForSale: {
			type: Boolean,
			default: true,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		history: [
			{
				event: {
					type: String,
					required: true,
				},
				date: {
					type: Date,
					default: Date.now,
				},
			},
		],
	},
	{ timestamps: true }
); // TODO: relate to 4 bar system

const AmenitiesSchema = new Schema({
	// Basic Amenities (for simpler properties like tents and cabins)
	basic: {
		campfire: {
			description: "A basic campfire for cooking and light.",
			buffs: {
				life: +2, // Provides warmth during cold nights
			},
			nerfs: {
				stamina: -1, // requires fuel and effort to maintain
			},
		},
		basicBed: {
			description: "A simple bed to rest in.",
			buffs: {
				life: +2, // Provides warmth during cold nights
			},
			nerfs: {
				stamina: -1, // requires fuel and effort to maintain
			},
			waterSource: {
				description: "A nearby water source like a well or stream.",
				buffs: {
					life: +2, // Provides warmth during cold nights
				},
				nerfs: {
					stamina: -1, // requires fuel and effort to maintain
				},
			},
			fireplace: {
				description: "A small hearth for warmth and cooking.",
				buffs: {
					life: +2, // Provides warmth during cold nights
				},
				nerfs: {
					stamina: -1, // requires fuel and effort to maintain
				},
			},
			basicFurniture: {
				description: "Tables, chairs, and other basic furniture.",
				buffs: {
					life: +2, // Provides warmth during cold nights
				},
				nerfs: {
					stamina: -1, // requires fuel and effort to maintain
				},
			},
			storageChest: {
				description: "For storing basic items.",
				buffs: {
					life: +2, // Provides warmth during cold nights
				},
				nerfs: {
					stamina: -1, // requires fuel and effort to maintain
				},
			},
		},

		// Intermediate Amenities (for properties like shacks, houses, and small ranches)
		intermediate: {
			woodStove: {
				description: "A stove for cooking and heating.",
				buffs: {
					life: +2, // Provides warmth during cold nights
				},
				nerfs: {
					stamina: -1, // requires fuel and effort to maintain
				},
				gardenPlot: {
					description: "A small space for growing crops.",
					buffs: {
						foodSupply: 5, // Provides a small but steady food supply
					},
					nerfs: {
						space: -2, // Takes up valuable property space
					},
				},
				livestockPen: {
					description:
						"A pen for keeping small animals (chickens, goats, etc.).",
					buffs: {
						foodSupply: 10, // Provides meat and milk, increasing food security
					},
					nerfs: {
						maintenance: -3, // Requires upkeep and care
					},
				},
				stable: {
					description: "A shelter for horses or other livestock.",
					buffs: {
						animalHealth: 5, // Ensures livestock stay healthy
						mobility: 3, // Increases movement speed for any horses
					},
					nerfs: {
						space: -2, // Takes up a considerable amount of space
					},
				},
				outbuildings: {
					description: "Additional storage or farming buildings.",
					buffs: {
						storageCapacity: 10, // Increases overall storage
					},
					nerfs: {
						upkeep: -2, // Requires maintenance and repair
					},
				},
				cistern: {
					description:
						"A system for collecting and storing rainwater.",
					buffs: {
						waterSupply: 5, // Provides additional water during dry spells
					},
					nerfs: {
						capacity: -2, // Limited in size, requires frequent cleaning
					},
				},
				furnitureUpgrade: {
					description: "Better quality tables, chairs, and storage.",
					buffs: {
						comfort: 5, // Increases comfort and relaxation
					},
					nerfs: {
						cost: -3, // Expensive to acquire and maintain
					},
				},
				outhouse: {
					description: "A small outdoor toilet.",
					buffs: {
						hygiene: 3, // Improves hygiene and sanitation
					},
					nerfs: {
						comfort: -3, // Lacks indoor plumbing, uncomfortable
					},
				},
			},

			// Advanced Amenities (for ranches, farms, and estates)
			advanced: {
				largeBarn: {
					description:
						"A spacious barn for livestock, tools, and storage.",
					buffs: {
						storageCapacity: 15, // Massive increase in storage space
					},
					nerfs: {
						upkeep: -3, // High maintenance cost
					},
				},
				waterWell: {
					description:
						"A self-sustaining well with a pump for consistent water supply.",
					buffs: {
						hydration: 10, // Consistent water supply
					},
					nerfs: {
						upkeep: -2, // Requires periodic maintenance
					},
				},
				corral: {
					description: "A large fenced area for animals like cattle.",
					buffs: {
						animalHealth: 10, // Increased livestock health
						foodSupply: 5, // Provides more space to keep cattle
					},
					nerfs: {
						space: -3, // Takes up a significant amount of land area
					},
				},
				workshop: {
					description:
						"A building or room for crafting, repairs, or business activities.",
					buffs: {
						craftingSpeed: 5, // Faster crafting and repairs
					},
					nerfs: {
						space: -2, // Reduces available living space
					},
				},
				animalFeedingSheds: {
					description: "Shelters for feeding livestock.",
					buffs: {
						animalHealth: 5, // Increases livestock health
					},
					nerfs: {
						upkeep: -2, // Requires maintenance and monitoring
					},
				},
				greenhouse: {
					description: "For growing crops in controlled conditions.",
					buffs: {
						foodSupply: 15, // Allows for year-round crop growth
					},
					nerfs: {
						cost: -3, // Expensive to build and maintain
					},
				},
				guestHouse: {
					description: "A separate house for visitors or workers.",
					buffs: {
						hospitality: 10, // Increases ability to host guests or workers
					},
					nerfs: {
						space: -3, // Takes up extra space on the property
					},
				},
				laundryArea: {
					description: "Space to wash clothes and linens.",
					buffs: {
						cleanliness: 5, // Increases cleanliness and hygiene
					},
					nerfs: {
						space: -2, // Requires room that could be used for other things
					},
				},
				tackRoom: {
					description: "For storing horse gear and other tools.",
					buffs: {
						equipmentStorage: 5, // Better organization for tools and horse gear
					},
					nerfs: {
						space: -2, // Takes up storage space
					},
				},
				largeGarden: {
					description:
						"Extensive plots for growing crops, herbs, or vegetables.",
					buffs: {
						foodSupply: 20, // Increases available food production
					},
					nerfs: {
						space: -4, // Takes up a lot of space on the property
					},
				},
			},

			// Luxury Amenities (for mansions and large estates)
			luxury: {
				privateLibrary: {
					description: "A room full of books for study or leisure.",
					buffs: {
						knowledge: 5, // Increases learning or crafting efficiency
					},
					nerfs: {
						space: -5, // Takes up a large portion of the property
					},
				},
				ornateFurnishings: {
					description:
						"High-end furniture, including velvet chairs, fine wood tables, etc.",
					buffs: {
						comfort: 10, // Significantly increases comfort levels
					},
					nerfs: {
						cost: -5, // Expensive to acquire and maintain
					},
				},
				privateOffice: {
					description:
						"A dedicated space for business dealings or personal work.",
					buffs: {
						productivity: 5, // Increases income or crafting efficiency
					},
					nerfs: {
						space: -3, // Takes away from the overall living area
					},
				},
				trophyRoom: {
					description:
						"A room to display hunting trophies or valuable items.",
					buffs: {
						prestige: 10, // Increases the prestige of the property and owner
					},
					nerfs: {
						space: -4, // Takes up a large room
					},
				},
				lushGarden: {
					description:
						"A beautifully designed garden with flowers, shrubs, and trees.",
					buffs: {
						comfort: 15, // Enhances relaxation and adds aesthetic value
					},
					nerfs: {
						upkeep: -3, // Requires regular maintenance
					},
				},
				servantsQuarters: {
					description: "Rooms or cabins for live-in staff.",
					buffs: {
						organization: 5, // Helps maintain the estate by housing staff
					},
					nerfs: {
						space: -5, // Takes away from usable living space
					},
				},
				armory: {
					description:
						"A room or building to store weapons, tools, and armor.",
					buffs: {
						security: 10, // Increases protection for the estate
					},
					nerfs: {
						space: -3, // Takes up room, reducing available space
					},
				},
				swimmingPool: {
					description: "A luxury feature for relaxation and leisure.",
					buffs: {
						relaxation: 15, // Boosts overall relaxation and comfort
					},
					nerfs: {
						cost: -4, // Expensive to build and maintain
					},
				},
				coveredPorch: {
					description:
						"A large, comfortable porch or veranda for sitting outside.",
					buffs: {
						comfort: 10, // Adds relaxation and aesthetic value
					},
					nerfs: {
						space: -3, // Takes up outdoor space
					},
				},
				wineCellar: {
					description:
						"A cool, secure space for storing fine wines and spirits.",
					buffs: {
						luxury: 10, // Adds to the luxury feel of the property
					},
					nerfs: {
						space: -3, // Takes away from usable property space
					},
				},
				ballroom: {
					description: "A grand hall for hosting parties and events.",
					buffs: {
						prestige: 20, // Significant increase to the estate's prestige
					},
					nerfs: {
						space: -6, // Requires a large amount of space
					},
				},
				entertainmentRoom: {
					description:
						"A space for playing games, cards, or even listening to music.",
					buffs: {
						morale: 10, // Increases overall enjoyment and happiness of residents
					},
					nerfs: {
						space: -3, // Reduces available living space
					},
				},
			},
		},
	},
});

// Model based on Schema
const Property = mongoose.model("Property", PropertySchema);

// Export the model
module.exports = Property;
