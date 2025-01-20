const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Bank Schema                                      //TODO: ADD ALL TO ENUMJS
const BankSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    location: {     // ref to WorldJS
        type: {
            type: String,
        },
        country: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Country",
        },
        state: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Country",
        },
        coordinates: {
            type: Number,
            required: true,
        },
    },
    owner: {
        type: String,
        enum: [
            "United States Government",
            "",
            "",
            "",
            "",
        ],
        default: "United States Government"
    },
    reputation: {
        type: String,
        enum: [
            "United States Government",
            "",
            "",
            "",
            "",
        ],
        default: "United States Government"
    },
    isBlackMarket: {
        type: Boolean,
    },
    interestRate: {
        savings: {
            type: Number,
        },
        checking: {
            type: Number,
        },
        loans: {
            type: Number,
        },

    },
    transactionFee: {           // varying aspect idk im not a bank guy
        type: Number,
    },
    accounts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "BankAccount"
    }],
    loanRecords: [
        {
            borrower: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            amountBorrowed: {
                type: Number,
                
            },
            interestRate: {
                type: Number,
                
            },
            dueDate: {
                type: Date,
            },
            status: {           // TODO: needs to be added to ENUMJS
                type: String,
                enum: ["Active", "Repaid", "Defaulted"],
                default: "Active",
            },
        },
    ],


}, {
    timestamps: true,
});

// Model based on Schema
const Bank = mongoose.model('Bank', BankSchema);

// Export the model
module.exports = Bank;
