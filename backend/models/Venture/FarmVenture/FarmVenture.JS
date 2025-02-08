const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// FarmVenture Schema
const FarmVentureSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    soilQuality: {
        type: Number,
        default: 100, // 0 to 100 scale
    },
    waterLevel: {
        type: Number,
        default: 100, // 0 to 100 scale
    },
    pestControl: {
        type: Number,
        default: 100, // 0 to 100 scale
    },
    harvestReadiness: {
        type: Number,
        default: 0, // 0 to 100 scale
    },
    cropsPlanted: [CropSchema], // Array of crops with detailed info
    farmEquipment: [FarmEquipmentSchema], // Array of farm equipment
    livestock: [LivestockSchema], // Array of livestock
    upgrades: {
        irrigationSystem: {
            type: Boolean,
            default: false, // Reduces water level depletion
        },
        pestControlSystem: {
            type: Boolean,
            default: false, // Reduces pest impact
        },
        soilEnhancer: {
            type: Boolean,
            default: false, // Slows down soil quality degradation
        },
        greenhouse: {
            type: Boolean,
            default: false, // Protects crops from weather fluctuations
        },
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("FarmVenture", FarmVentureSchema);
