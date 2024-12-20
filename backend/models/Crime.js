const mongoose = require("mongoose");

const CrimeSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			enum: ["Financial", "Environmental"],
			required: true,
		},
		rewards: {
			// Could be items, money, etc. (would have to make a loot table)
			type: mongoose.Schema.Types.Mixed, // Flexible for different data types
		},
		penalty: {
			// Could be many things and could vary (maybe a penalty table?)
			type: mongoose.Schema.Types.Mixed,
		},
		baseChanceToSucceed: {
			// Number from 0-100
			type: Number,
			required: true,
			min: 0,
			max: 100,
		},
		levelRequired: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Crime = mongoose.model("Crime", CrimeSchema);

module.exports = Crime;
