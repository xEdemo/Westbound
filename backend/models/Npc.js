const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// NPC Schema
const NpcSchema = new Schema ({
    identity: {
        name: {
            type: String,
            required: true,
            unique: true
        },
        age: {
            type: Number,
        },
        gender: {
            type: String,
            enum: ["male", "female"]
        },
        occupation: {
            type: String
        },
        
        type: {
            type: String,
            enum: [""],
        },
        role: {
            type: String,
            enum: ["quest giver", "store clerk", ""]
        },
        attackable: {
            type: boolean
        },
    },
    stats: {
        health: {
            type: Number,
        },
        stamina: {
            type: Number,
        },
        weapons: {
            type: String,
            enum: [""], // needs an item ref when weapons is created
        },

    },
    appearance: {
        physicalDescription: {
            type: String,
        },
        clothingDescription: {
            type: String,
        },
        distinctFeatures: {
            type: String,
        },
    },
    behavior: {                 // dialogue pattern could also be added, w method to add spacing... to any designated NPC
        personality: {
            type: String,
        },
        temperament: {
            type: String,
        },
    },
    interactions: {
        dialogueOptions: {
            type: String,
            enum: [""],
        },
        quests: {
            type: String,
            enum: [""],
        },
        tradeInventory: {
            type:String,
            enum: [""],
        },
    },
    location: {
        currentLocation: {
            type: String,
            enum: [""],
        },
        homeLocation: {
            type: String,
            enum: [""],
        },
        movementSchedule: {
            type: String,
            // needs algo implemented
        }
    },
    
}, {
    timestamps: true,
});

// Model based on Schema
const Npc = mongoose.model('Npc', NpcSchema);

// Export the model
module.exports = Npc;