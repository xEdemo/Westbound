const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Bank Schema
const BankSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    location: {     // ref to WorldJS
        type: {
            type: String,
        },
        country: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Country",
        },
        state: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Country",
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
    isBlackMarket: {
        type: Boolean,
    },

}, {
    timestamps: true,
});

// Model based on Schema
const Bank = mongoose.model('Bank', BankSchema);

// Export the model
module.exports = Bank;
