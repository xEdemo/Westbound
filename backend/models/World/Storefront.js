const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StorefrontSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
    },
    type: {
        type: String,
        enum: [''],
        required: true,
    },
    description: {
        type: String,
    },
    location: {
        type: String,
        enum: ['']
    },
    blackMarket: {
        type: Boolean,
    },
    customerInteraction: {
        visitorsToday: {
            type: Number,
            // add algo method
        },
        loyaltyProgram: {
            type: Number,
            // add algo method
        },
    },
    inventory: {
        ownerName: {
            type: String, // add ref once NPC schema is created
        },
        restockRate: {
            type: Number,
            // add algo method
        },
        storeBalance: {

        },
        taxRate: {
            type: Number,
            min: 0,
            max: 10.4,
            // add algo method
        },
        items: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Item"
        },
    },


}, {
    timestamps: true,
});

// Model based on Schema
const Storefront = mongoose.model('Storefront', StorefrontSchema);

// Export the model
module.exports = Storefront;
