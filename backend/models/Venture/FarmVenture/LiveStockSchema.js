const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// LiveStock Schema

const LivestockSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    species: {              // needs Enum
        type: String,       // needs cap
        required: true      // some type of tiered system
    },
    health: {
        type: Number,
        default: 100
    },
    age: {
        type: Number, // in months
        required: true
    },
    ageCap: {
        type: Number,
    },
    production: {
        type: String, // Milk, wool, meat, etc.
        required: true
    },
    lastFed: {
        type: Date,
        default: Date.now
    },
    hunger: {
        type: Number,
    },
    hungerCap: {
        type: Number,
    },
    feedRequirement: {
        type: String,
    },
});
