const mongoose = require("mongoose");

const EnvironmentalCrimeSchema = new mongoose.Schema(
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

const Environmental = mongoose.model("EnvironmentalCrime", EnvironmentalCrimeSchema);

module.exports = Environmental;