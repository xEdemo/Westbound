const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Property Schema
const PropertySchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		type: {
			type: String,
			enum: [
				"Tent",
				"Cabin",
				"Shack",
				"House",
				"Ranch",
				"Farm",
				"Estate",
				"Mansion",
			],
			required: true,
		},
		cost: {
			buy: {
				type: Number,
				default: 100,
			},
			sell: {
				// should be about 20% less
				type: Number,
				default: 80,
			},
			marketValue: {
				currentValue: {
					type: Number,
				},
				purchases: [{
					purchasedFrom: {
						type: mongoose.Schema.Types.ObjectId,
                        ref: "User",
					},
                    purchaser: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User",
                    },
                    price: {
                        type: Number,
                    },
                    date: {
                        type: Date,
                    },
				}],
				dailyChange: {
                    type: Number,
                },
                monthlyChange: {
                    type: Number,
                },
                yearlyChange: {
                    type: Number,
                }
			},
		},
		description: {
			type: String,
			required: true,
		},
		location: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Town",
		},
		amenities: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "Amenities",
		},
		isAvailableForSale: {
			type: Boolean,
			default: true,
		},
		isForSale: {
			type: Boolean,
			default: true,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		history: [
			{
				owner: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
				},
				newOwner: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
				},
				transferDate: {
					type: Date,
					default: () => new Date.now().toISOString(),
				},
			},
		],
	},
	{ timestamps: true }
);

// Model based on Schema
const Property = mongoose.model("Property", PropertySchema);

// Export the model
module.exports = Property;
