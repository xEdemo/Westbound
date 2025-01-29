const mongoose = require("mongoose");

const WaystationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: {
            // finish later
        },
        coordinates: {
            type: number,
            required: true,
        },
    },
    type: {
        type: [String],       /// possibly array
        enum: [
            "",
            "",
            "",
            "",
            "",


        ]
    },
    Hazards: {                          // needs ref to HazardJS
        type: [String],
        enum: [
            "",
            "",
            "",
            "",
            "",

        ]
    },
    establishedYear: {              // way to establish black market waystations
        type: Number,
        required: true,
    },
    owner: {
        type: String,
        default: " United States Government",
    },
    isBlackMarket: {
        type: boolean,
    },
    connectedTravelRoute: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Travel.js"   // ??????? ask streve
    },
}, {
    timestampes: true,
});

// Model based on Schema
const Waystation = mongoose.model('Waystation', WaystationSchema);

// Export the model
module.exports = Waystation;
