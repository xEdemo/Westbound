const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {mineHazards, minePositiveEventType, mineNegativeEventType,} = require ("../../utils/enum.js")

// Mine Schema
const MineSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    typeOfMine: {
        type: String,
        enum:[
            "Iron",
            "Silver",
            "Gold",
            "Gem",
        ],
    },
    description: {
        type: String,
    },
    location: {
        type: String, // needs to ref fuckin states or country or whatever
    },
    miningLevelRequirement: {
        type: Number,
    },
    resources: {
        iron: {
            type: Number,
        },
        silver: {
            type: Number,
        },
        gold: {
            type: Number,
        },
        gems: {
            type: Number,
        },
    },
    currentYield: {         // granular vs aggregate tracking, ask steve
        type: Number,
        default: 0,         // aggre - simplicity / fast implementation
    },                      // granular - more complex resource mangement
    maxYield: {
        type: Number,
        required: true,
    },
    hazards: [{
        type: String,
            enum: mineHazards
        // enum: [
        //     "Cave-In",
        //      "Gas Leak",
        //      "Rockfall", 
        //      "Flooding", 
        //     ],
    }],
    depth: {
        type: Number,       // depth level of mine
        default: 1,
    },
    equipmentNeeded: [{
        type:String,
        enum: [
            "",
            "",
            "",
        ],
    }],
    events: [{                                  // need to be linked to some type math + probability
        positiveEventType: {                    // TODO: add to enumJS
            type: String,
            enum: minePositiveEventType
            // enum: [
            //     iron: [
            //         "Ore Vein Discovery",		// iron
            //         "High Yield Extraction",	// iron
            //         "Dense Deposit",			// iron
            //         "High Purity Ore",			// iron
            //         ],
            //         silver: [
            //         "Ore Vein Discovery",		// silver
            //         "Ore Vein Discovery",		// silver
            //         "High Yield Extraction",	// silver
            //         "High Purity Ore",			// silver
            //         ],
            //         gold: [
            //         "Ore Vein Discovery",		// gold
            //         "High Yield Extraction",	// gold
            //         "",							// gold
            //         "",							// gold
            //         ],
            //         gems: [
            //         "Ore Vein Discovery",		// gems
            //         "High Yield Extraction",	// gems
            //         "",							// gems
            //         "",							// gems
            //         ],
            // ],
        },  
        negativeEventType: {                // // TODO: add to enumJS
            type: String,
            enum: mineNegativeEventType
            // enum: [
            //     iron: [
            //         "Vein Collapse",			// iron
            //         "Rockfall Incident",		// iron
            //         "Ore Contamination",		// iron
            //         "Flooding",					// iron
            //         ],				
            //         silver: [
            //         "Vein Collapse",			// silver
            //         "Rockfall Incident",		// silver
            //         "Ore Contamination",		// silver
            //         "Flooding",					// silver
            //         "",							// silver
            //         ],
            //         gold: [
            //         "Vein Collapse",			// gold
            //         "Rockfall Incident",		// gold
            //         "Ore Contamination",		// gold
            //         "Flooding",					// gold
            //         ],
            //         gems: [
            //         "Vein Collapse",			// gems
            //         "Rockfall Incident",		// gems
            //         "Ore Contamination",		// gems
            //         "Flooding",					// gems
            //         ],
            // ],
        },
    }],
    npcInteraction: {
        type: Schema.Types.ObjectId,
        ref: 'Npc'
    },




}, {
    timestamps: true,
});

// Model based on Schema
const Mine = mongoose.model('Mine', MineSchema);

// Export the model
module.exports = Mine;

