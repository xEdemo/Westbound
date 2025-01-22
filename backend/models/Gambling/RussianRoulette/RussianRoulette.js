const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RussianRouletteSchema = new Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    }],
    bulletsInChamber: {
        type: Number,  // Number of bullets loaded (1-6)
        required: true,
        min: 1,
        max: 6
    },
    chamberPosition: {
        type: Number,  // Current chamber position (1-6)
        default: 1
    },
    currentTurn: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        default: null
    },
    loser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        default: null
    },
    stakes: {
        currency: { type: Number, default: 0 },
        item: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Item', default: null 
        },
    },
    result: {
        type: String,
        enum: [
            'ongoing', 
            'win', 
            'death', 
            'injury',
        ],
        default: 'ongoing'
    },
    injurySeverity: {
        type: String,
        enum: [
            'none', 
            'minor', 
            'severe', 
            'fatal',
        ],
        default: 'none'
    },
    reputationImpact: {
        winner: { 
            type: Number, 
            default: 0 
        },
        loser: { 
            type: Number, 
            default: 0,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('RussianRoulette', RussianRouletteSchema);
