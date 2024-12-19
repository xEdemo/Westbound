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
			required: function () {
				return this.isNew; // Required only on creation
			},
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
			required: function () {
				return this.isNew; // Required only on creation
			},
		},
	},
	{
		timestamps: true,
	}
);

const Financial = mongoose.model("Financial", FinancialCrimeSchema);

module.exports = Financial;
