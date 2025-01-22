const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChessGameSchema = new Schema({
    playerWhite: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    playerBlack: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        default: null
    },
    result: {
        type: String,
        enum: [
            'white_win', 
            'black_win', 
            'draw', 
            'in_progress',
        ],
        default: 'in_progress'
    },
    moves: [{
        moveNumber: Number,
        notation: String,  // Standard chess notation (e.g., e4, Nf3)
        timestamp: Date
    }],
    stakes: {
        type: Number,  // Gold or item-based wagers
        default: 0
    },
    town: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Town'
    },
    isRanked: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ChessGame', ChessGameSchema);
