const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MarketSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,       // file path to img
    },
    location: {
        town: mongoose.Schema.Types.ObjectId,
        ref: 'town',
    },
    isBlackMarket: {
        type: boolean,
    },
    
})