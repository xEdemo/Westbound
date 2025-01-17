const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Bank Schema
const BankSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    location: {     // ref to WorldJS
        type: {
            type: String,
        },
        country: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "World",
        },
        state: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "World",
        },

        coordinates: {
            type: Number,
            required: true,
        },
    },
    owner: {
        type: String,
        enum: [
            "United States Government",
            "",
            "",
            "",
            "",
        ],
        default: "United States Government"
    },
    reputation: {
        type: String,
        enum: [
            "United States Government",
            "",
            "",
            "",
            "",
        ],
        default: "United States Government"
    },

}, {
    timestamps: true,
});

// Model based on Schema
const Bank = mongoose.model('Bank', BankSchema);

// Export the model
module.exports = Bank;
