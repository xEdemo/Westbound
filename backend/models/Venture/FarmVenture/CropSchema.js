const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Crop Schema
const CropSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["grain", "vegetable", "fruit", "herb"],
    },
    growthStage: {
        type: String,
        enum: ["Planted", "Growing", "Ready to Harvest", "Harvested"],
    },
    plantedDate: {
        type: Date,
        default: Date.now
    },
    harvestDate: {
        type: Date,
        default: Date.now,
    },
    yieldAmount: {
        type: Number,
    },
    health: {
        type: Number,
    },
    healthCap: {
        type: Number,
    },
    production: {           // will need enum of prod rewards
        type: String,
    }
})