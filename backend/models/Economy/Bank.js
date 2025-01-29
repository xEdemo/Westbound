const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Bank Schema                                      //TODO: ADD ALL TO ENUMJS
const BankSchema = new Schema({
    name: {
        type: String,                   /// where does this ref BankAccountSchema
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

// things to consider
// - banks might send bounty hunters to reposess assets from players who default on loans
// - bank takes a percentage every transaction
// - fee deductions need to be logged seperately in transaction history
// - expansion for gold reserves in certain banks
// - different tiers of accounts
// - a way to rob a bank, tjhat triggers a wanted status that then affects reputation system idk
// - bank needs an image baseVar 