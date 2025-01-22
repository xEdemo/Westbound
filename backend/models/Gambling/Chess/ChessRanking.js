const ChessRankingSchema = new Schema({
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    rankTitle: {
        type: String,  
        default: "GM" // lol haha
    },
    gamesPlayed: {
        type: Number,
        default: 0
    },
    gamesWon: {
        type: Number,
        default: 0
    },
    gamesLost: {
        type: Number,
        default: 0
    },
    eloRating: {
        type: Number,
        default: 1200  // Standard starting chess rating
    },
    totalStakesWon: {
        type: Number,
        default: 0
    },
});

module.exports = mongoose.model('ChessRanking', ChessRankingSchema);
