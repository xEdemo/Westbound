const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Hazard Schema
const HazardSchema = new Schema({
    name: {
        type: String,
        required: true,
        enum: [         // replaceable
            "bandits",
            "wild animals",
            "natural disasters",
            "broken equipment",
            "disease",
            "harsh weather",
            "fatigue",

        ],
    },
    applicableModes: {
        type: [String],
        enum: [
            "railraod",
            "horseback",
            "stagecoach",
            "walking",
            "",
        ],
    },
    probability: {
        type: Number,       // reflected as percentage, needs algo poss of some sort
        required: true,
    },
    effects: {
        delay: {
            type: Number,   // reflected as hours
        },
        resourceLoss: {
            type: String,       // type of resource lost - money, food, gatherables, health etc
        },

    },
    mitigation: {
        type: String,       // types of ways to minimize or avoid hazards, needs further attention, poss Mitigants.JS in travel folder?
    },
    triggeredBy: {
        type: String,       
    },

}, {
    timestamps: true,
});

const MitigantSchema = new Schema({


});

// Models based on Schema
const Hazard = mongoose.model('Hazard', HazardSchema);
const Mitigant = mongoose.model('Mitigant', MitigantSchema);

// Export the models
module.exports = {Hazard, Mitigant};
