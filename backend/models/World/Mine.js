const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {mineHazards} = require ("../../utils/enum.js")

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
            default: 0,
        },
        silver: {
            type: Number,
            default: 1,
        },
        gold: {
            type: Number,
            default: 2,
        },
        gems: {
            type: Number,
            default: 3,
        },
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
        positiveEventType: {
            type: String,
            enum: [
                "Gold Rush",
                "Ore Vein Discovery",
            ],
        },  
        negativeEventType: {
            type: String,
            enum: [
                "equipment Breakage",
                "",
                "",
            ],
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
