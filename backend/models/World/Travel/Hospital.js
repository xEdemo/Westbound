const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HospitalSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String, // Could be more specific with refs (e.g., Town, State)
        required: true,
    },
    users: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User", // Reference to a User schema
                required: true,
            },
            timeInHospital: {
                type: Number, // Time in hours or days, based on your requirements
                required: true,
                default: 0,
            },
            reason: {
                type: String, // Reason for hospitalization
            },
            dateAdmitted: {
                type: Date,
                required: true,
                default: Date.now,
            },
            dateDischarged: {           // for logging purposes
                type: Date,
            },
        },
    ],
    staff: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Npc", // Reference to an NPC schema for hospital staff
        },
    ],
    services: [
        {
            name: {
                type: String,
                required: true,
            },
            description: {
                type: String,
            },
            cost: {
                type: Number,
                min: 0,
            },
        },
    ],
    hazards: [
        {
            type: String, // List of potential issues (e.g., disease outbreaks, medicine shortages)
        },
    ],
});

const Hospital = mongoose.model("Hospital", HospitalSchema);

module.exports = Hospital;
