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
		crime: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			refPath: "type", // discriminator based on type
		},
	},
	{
		timestamps: true,
	}
);

const Crime = mongoose.model("Crime", CrimeSchema);

module.exports = Crime;
