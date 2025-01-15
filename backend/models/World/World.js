const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// World Schema

const WorldSchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    country: {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        states: [{
            name: {
                type: String,
            },
            description: {
                type: String,
            },
            population: {
                type:  Number,
                min: 0,
                max: 1000,
            },
            towns: [{
                type: String,
                name: {
                    type: String,
                },
                description: {
                    type: String,
                },
                // enum: ["village", "ghost town", "city", "settlement"],
                storefronts: [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Storefront",
                }],
                transportation: {
                    
                }
            }],

        }],

    },
}, {
    timestamps: true,
});

// Model based on Schema
const World = mongoose.model('World', WorldSchema);

// Export the model
module.exports = World;
