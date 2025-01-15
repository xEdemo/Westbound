const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Property Schema
const PropertySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        enum: ['Tent', 'Cabin', 'Shack', 'House', 'Ranch', 'Farm', 'Estate', 'Mansion'],
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
    amenities: [{
        properties: {
            buffs: {
                type: String
            },
            nerfs: {
                type: String
            },
            capacity: {

            },


        },

        // Basic Amenities (for simpler properties like tents and cabins):

        // Campfire: A basic campfire for cooking and light.
        // Basic Bed: A simple bed to rest in.
        // Water Source (Well/Stream): A nearby water source like a well or stream.
        // Fireplace: A small hearth for warmth and cooking.
        // Basic Furniture: Tables, chairs, and other basic furniture.
        // Storage Chest: For storing basic items.
				// Intermediate Amenities (for properties like shacks, houses, and small ranches):
				// Intermediate Amenities (for properties like shacks, houses, and small ranches):

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
				// Advanced Amenities (for ranches, farms, and estates):

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
				// Luxury Amenities (for mansions and large estates):

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
				// Additional Functional Amenities (across different property tiers):

        // Additional Functional Amenities (across different property tiers):

        // Fence: To mark boundaries and protect the property.
        // Solar Panels: For providing electricity in more advanced properties.
        // Woodworking Area: A space for crafting furniture or tools.
        // Metalworking Area: For creating metal tools or building structures.
        // Farming Equipment: Implements for plowing, seeding, and harvesting crops.
        // Communication (Telegraph): A system for long-distance communication in later-tier properties.

				// Example Property Amenities by Type:
				// Example Property Amenities by Type:

        // Example Property Amenities by Type:

        // Tent: Campfire, Basic Bed
        // Cabin: Campfire, Basic Bed, Water Source, Small Furniture
        // Shack: Wood Stove, Livestock Pen, Outhouse, Basic Furniture
        // House: Wood Stove, Garden Plot, Water Well, Stable
        // Ranch: Large Barn, Workshop, Livestock Corral, Water Well
        // Farm: Greenhouse, Animal Feeding Sheds, Large Garden, Workshop
        // Estate: Trophy Room, Private Library, Guest House, Large Garden
        // Mansion: Ornate Furnishings, Ballroom, Wine Cellar, Private Office
    }],
    isAvailableForSale: {
        type: Boolean,
        default: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    history: [{
        event: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    }],
}, { timestamps: true });                                                           // need

const AmenitiesSchema = new Schema({
        // Basic Amenities (for simpler properties like tents and cabins)
        basic: {
            campfire: {
                description: "A basic campfire for cooking and light.",
                buffs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
                nerfs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
            },
            basicBed: {
                description: "A simple bed to rest in.",
                buffs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
                nerfs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
            },
            waterSource: {
                description: "A nearby water source like a well or stream.",
                buffs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
                nerfs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
            },
            fireplace: {
                description: "A small hearth for warmth and cooking.",
                buffs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
                nerfs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
            },
            basicFurniture: {
                description: "Tables, chairs, and other basic furniture.",
                buffs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
                nerfs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
            },
            storageChest: {
                description: "For storing basic items.",
                buffs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
                nerfs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
            },
        },
    
        // Intermediate Amenities (for properties like shacks, houses, and small ranches)
        intermediate: {
            woodStove: {
                description: "A stove for cooking and heating.",
                buffs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
                nerfs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
            },
            gardenPlot: {
                description: "A small space for growing crops.",
                buffs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
                nerfs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
            },
            livestockPen: {
                description: "A pen for keeping small animals (chickens, goats, etc.).",
                buffs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
                nerfs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
            },
            stable: {
                description: "A shelter for horses or other livestock.",
                buffs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
                nerfs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
            },
            outbuildings: {
                description: "Additional storage or farming buildings.",
                buffs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
                nerfs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
            },
            cistern: {
                description: "A system for collecting and storing rainwater.",
                buffs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
                nerfs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
            },
            furnitureUpgrade: {
                description: "Better quality tables, chairs, and storage.",
                buffs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
                nerfs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
            },
            outhouse: {
                description: "A small outdoor toilet.",
                buffs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
                nerfs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
            },
        },
    
        // Advanced Amenities (for ranches, farms, and estates)
        advanced: {
            largeBarn: {
                description: "A spacious barn for livestock, tools, and storage.",
                buffs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
                nerfs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
            },
            waterWell: {
                description: "A self-sustaining well with a pump for consistent water supply.",
                buffs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
                nerfs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
            },
            corral: {
                description: "A large fenced area for animals like cattle.",
                buffs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
                nerfs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
            },
            workshop: {
                description: "A building or room for crafting, repairs, or business activities.",
                buffs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
                nerfs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
            },
            animalFeedingSheds: {
                description: "Shelters for feeding livestock.",
                buffs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
                nerfs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
            },
            greenhouse: {
                description: "For growing crops in controlled conditions.",
                buffs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
                nerfs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
            },
            guestHouse: {
                description: "A separate house for visitors or workers.",
                buffs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
                nerfs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
            },
            laundryArea: {
                description: "Space to wash clothes and linens.",
                buffs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
                nerfs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
            },
            tackRoom: {
                description: "For storing horse gear and other tools.",
                buffs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
                nerfs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
            },
            largeGarden: {
                description: "Extensive plots for growing crops, herbs, or vegetables.",
                buffs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
                nerfs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
            },
        },
    
        // Luxury Amenities (for mansions and large estates)
        luxury: {
            privateLibrary: {
                description: "A room full of books for study or leisure.",
                buffs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
                nerfs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
            },
            ornateFurnishings: {
                description: "High-end furniture, including velvet chairs, fine wood tables, etc.",
                buffs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
                nerfs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
            },
            privateOffice: {
                description: "A dedicated space for business dealings or personal work.",
                buffs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
                nerfs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
            },
            trophyRoom: {
                description: "A room to display hunting trophies or valuable items.",
                buffs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
                nerfs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
            },
            lushGarden: {
                description: "A beautifully designed garden with flowers, shrubs, and trees.",
                buffs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
                nerfs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
            },
            servantsQuarters: {
                description: "Rooms or cabins for live-in staff.",
                buffs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
                nerfs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
            },
            armory: {
                description: "A room or building to store weapons, tools, and armor.",
                buffs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
                nerfs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
            },
            swimmingPool: {
                description: "A luxury feature for relaxation and leisure.",
                buffs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
                nerfs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
            },
            coveredPorch: {
                description: "A large, comfortable porch or veranda for sitting outside.",
                buffs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
                nerfs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
            },
            wineCellar: {
                description: "A cool, secure space for storing fine wines and spirits.",
                buffs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
                nerfs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
            },
            ballroom: {
                description: "A grand hall for hosting parties and events.",
                buffs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
                nerfs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
            },
            entertainmentRoom: {
                description: "A space for playing games, cards, or even listening to music.",
                buffs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
                nerfs: {
                    FIX: 5, // Provides warmth during cold nights
                    FIX: 3, // Provides light during night
                },
            },
        },
});

// Model based on Schema
const Property = mongoose.model('Property', PropertySchema);

// Export the model
module.exports = Property;
