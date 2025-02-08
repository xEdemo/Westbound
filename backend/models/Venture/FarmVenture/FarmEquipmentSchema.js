const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// FarmEquipmentSchema.js
const FarmEquipmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Tractor', 'Plow', 'Harvester', 'Irrigation'],
        required: true
    },
    condition: {
        type: String,
        enum: ['New', 'Good', 'Worn', 'Broken'],
        default: 'Good'
    },
    maintenanceDate: {
        type: Date,
        default: Date.now
    }
});