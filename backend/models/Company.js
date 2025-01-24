const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Company Schema
const CompanySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    isCompanyStockCompany: {
        type: Boolean,
    },
    type: {
        type: String,
        enum: [
            'Resource-Based',
            'Service-Based',
            'Black-market-Based',
        ],
    },
    image: {
      type: String,     // path to image
    },
    cost: {
        type: Number,
    },
    fixedPositionsAvailable: {
        type: Number,
    },
    rewards: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    taxExempt: {
        type:Boolean,
    },
    employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    finances: {
        capital: {
            type: Number,
        },
        expenses: [{
            type: Number,
        }],
        taxes: {
            type: Number,
        },
        netWorth: {
            type: Number,
        },
        generatedRevenue: {             // consider making a finances schema that applies to all
            type: Number,
        },
        salary: {
            type: Number,
        },
    },
    legalStatus: {
        type: String,
        enum: [
            'Legal',            // tax empt
            'Illegal',          // not tax exempt,higher risks
              ]
    },
    upgrades: {
        upgradeType: {
            type: String,
            enum: [
                '',
                '',
            ]
        }
    },


});