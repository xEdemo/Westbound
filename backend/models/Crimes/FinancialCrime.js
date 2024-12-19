const mongoose = require("mongoose");

const FinancialCrimeSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		levelRequired: {
			type: Number,
			required: true,
		},
		rewards: {
			// Could be items, money, etc. (would have to make a loot table)
		},
		penalty: {
			// Could be many things and could vary (maybe a penalty table?)
		},
		baseChanceToSucceed: {
			// Number from 0-100
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Financial = mongoose.model("FinancialCrime", FinancialCrimeSchema);

module.exports = Financial;