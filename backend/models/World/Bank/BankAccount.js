const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BankAccountSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "NPC", // The NPC or Player who owns the account
        required: true,
    },
    bank: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bank",
        required: true,
    },
    accountType: {
        type: String,
        enum: ["Savings", "Checking", "Loan"],
        required: true,
    },
    balance: {
        type: Number,
        default: 0,
    },
    loanAmount: {
        type: Number,
        default: 0,  // If accountType is 'Loan', track the total amount borrowed
    },
    transactionHistory: [
        {
            date: {
                type: Date,
                default: Date.now,
            },
            type: {
                type: String,
                enum: ["Deposit", "Withdrawal", "Loan Payment", "Fee Deduction"],
            },
            amount: {
                type: Number,
                required: true,
            },
            feeApplied: {
                type: Number,
                default: 0, // Amount deducted from the transaction as a fee
            },
        },
    ],
    interestAccrued: {
        type: Number,
        default: 0, // Tracks interest accumulated over time
    },
}, { timestamps: true });

module.exports = mongoose.model("BankAccount", BankAccountSchema);
