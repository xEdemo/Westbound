const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// FarmVenture Schema
const FarmVentureSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    
})