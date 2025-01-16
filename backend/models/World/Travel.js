const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TravelSchema
const TravelSchema = new Schema({                   // implement Hazards in either nest or hazardsJS with refs, most likely the latter
    mode: {
        type: String,
        required: true,
        enum: [
            "railroad",
            "horseback",
            "stagecoach",
            "walking",
        ],
    },
    speed: {
        type: String,       // reflected in MPH
        baseSpeed: {
            type: Number,
        },

    },
    cost: {         // CPM or flat fee?
        type: Number,
    },
    routes: {
        start: {
            type: String,       // needs ref from WorldJS
        },
        destination: {
            type: String,       // needs ref from WorldJS
        },
        distance: {             // reflected in Miles, maybe regex?
            type: Number,
        },
        dangerLevel: {          // needs some type of Ref from some type of danger
            type: String,
            enum: [
                "low",          // needs algo for each and a ref to hazards - poss HazardJS
                "medium",
                "high",
            ],
        },
    },
    time: {
        departure: {
            type: String, // morning
            estimatedDuration: {
                type: Number,       // time in hours

            },
        },
    },
    comfortLevel: {
        type: String,
        enum: [
            "rough",        // all add some type of buff/nerf or pros/cons
            "standard",
            "luxury",
            "private",
        ],
    },

}, {
    timestamps: true,
});

// Model based on Schema
const Travel = mongoose.model('Travel', TravelSchema);

// Export the model
module.exports = Travel;
