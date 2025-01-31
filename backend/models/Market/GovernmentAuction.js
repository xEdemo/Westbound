const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// GovernmentAuction Schema

const GovernmentAuctionSchema = new Schema({
    location: {
        type: String,       // pending refactoring of Town and locations
    },                      // could add sellerType ie fed govt, state govt, town govt
    status: {
        type: String,
        enum: [
            'Active',   
            'Closed',
        ],
    },
    createdBy: {
        type: String,   // pending ref for Admin
    },
    auctionStartTime: {
        type: Date,
    },
    auctionEndTime: {
        type: Date,
    },
    startingBids: {
        type: Number,
    },

});