const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Country Schema
const CountrySchema = new Schema(
	{
		name: {
			type: String,
			unique: true,
			required: true,
		},
		description: {
			type: String,
		},
		states: [
			{
				name: {
					type: String,
					unique: true,
				},
				description: {
					type: String,
				},
				population: {
					type: Number,
					min: 0,
					max: 1000,
				},
				banks: {
					type: [mongoose.Schema.Types.ObjectId],
					ref: "Bank",
				},
				towns: [
					{
						name: {
							type: String,
							unique: true,
						},
						description: {
							type: String,
						},
						type: {
							type: [String],
							enum: ["village", "ghost town", "city", "settlement"],
						},
						storefronts: [
							{
								type: mongoose.Schema.Types.ObjectId,
								ref: "Storefront",
							},
						],
						transportation: {},
					},
				],
			},
		],
	},
	{
		timestamps: true,
	}
);

// Model based on Schema
const Country = mongoose.model("Country", CountrySchema);

// Export the model
module.exports = Country;
