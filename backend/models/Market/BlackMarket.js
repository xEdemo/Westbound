const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// BlackMarket Schema

const BlackMarketSchema = new Schema({
    name: {
        type: String,
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Town" // need to figure out Schema Sitch with country/towns
    },
    inventory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
    },
    taxRate: {
        type: Number,
        default: 0,     // blackMakrets shudnt have a tax rate
    },
    heatLevel: {        // need iterations, where each transaction goes
        type: Number,
    },
    reputationRequiredToEnter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reputation"   // idk if this is the right ref
    },
    accessTiers: {
        type: String,
        enum: [
            "low",
            "medium",
            "high",
        ],
    },
    loanSharks: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Npc",
    },
    secretCodeForEntry: {
        type: Number,
    },

    


}, {
    timestamps: true,
});

// Model based on Schema
const BlackMarket = mongoose.model("BlackMarket", BlackMarketSchema);

// Export the model
module.exports = BlackMarket;
