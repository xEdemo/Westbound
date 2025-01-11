const mongoose = require("mongoose");

const LootTableSchema = new mongoose.Schema(
	{
		for: {
			type: String,
			required: true,
		},
		nothing: {
			chance: {
				type: Number,
				default: 5,
				min: 0,
				max: 100,
			},
		},
		common: {
			item: {
				type: [mongoose.Schema.Types.ObjectId],
				ref: "Item",
			},
			cashReward: {
				low: {
					type: Number,
				},
				high: {
					type: Number,
				},
			},
			chance: {
				type: Number,
				default: 55,
				min: 0,
				max: 100,
			},
		},
		uncommon: {
			item: {
				type: [mongoose.Schema.Types.ObjectId],
				ref: "Item",
			},
			cashReward: {
				low: {
					type: Number,
				},
				high: {
					type: Number,
				},
			},
			chance: {
				type: Number,
				default: 30,
				min: 0,
				max: 100,
			},
		},
		rare: {
			item: {
				type: [mongoose.Schema.Types.ObjectId],
				ref: "Item",
			},
			cashReward: {
				low: {
					type: Number,
				},
				high: {
					type: Number,
				},
			},
			chance: {
				type: Number,
				default: 5,
				min: 0,
				max: 100,
			},
		},
		epic: {
			item: {
				type: [mongoose.Schema.Types.ObjectId],
				ref: "Item",
			},
			cashReward: {
				low: {
					type: Number,
				},
				high: {
					type: Number,
				},
			},
			chance: {
				type: Number,
				default: 3,
				min: 0,
				max: 100,
			},
		},
		legendary: {
			item: {
				type: [mongoose.Schema.Types.ObjectId],
				ref: "Item",
			},
			cashReward: {
				low: {
					type: Number,
				},
				high: {
					type: Number,
				},
			},
			chance: {
				type: Number,
				default: 1.5,
				min: 0,
				max: 100,
			},
		},
		mythic: {
			item: {
				type: [mongoose.Schema.Types.ObjectId],
				ref: "Item",
			},
			cashReward: {
				low: {
					type: Number,
				},
				high: {
					type: Number,
				},
			},
			chance: {
				type: Number,
				default: 1,
				min: 0,
				max: 100,
			},
		},
		relic: {
			item: {
				type: [mongoose.Schema.Types.ObjectId],
				ref: "Item",
			},
			cashReward: {
				low: {
					type: Number,
				},
				high: {
					type: Number,
				},
			},
			chance: {
				type: Number,
				default: 0.4,
				min: 0,
				max: 100,
			},
		},
		masterwork: {
			item: {
				type: [mongoose.Schema.Types.ObjectId],
				ref: "Item",
			},
			cashReward: {
				low: {
					type: Number,
				},
				high: {
					type: Number,
				},
			},
			chance: {
				type: Number,
				default: 0.095,
				min: 0,
				max: 100,
			},
		},
		eternal: {
			item: {
				type: [mongoose.Schema.Types.ObjectId],
				ref: "Item",
			},
			cashReward: {
				low: {
					type: Number,
				},
				high: {
					type: Number,
				},
			},
			chance: {
				type: Number,
				default: 0.005,
				min: 0,
				max: 100,
			},
		},
	},
	{ timestamps: true }
);

const PenaltyTableSchema = new mongoose.Schema(
	{
		for: {
			type: String,
			required: true,
		},
		fines: {
			low: {
				type: Number,
				default: 100,
			},
			high: {
				type: Number,
				default: 1000,
			},
		},
		arrestChance: {
			type: Number,
			default: 10,
		},
		jailTime: {
			low: {
				type: Number,
				default: 10000, // May need to be in ms
			},
			high: {
				type: Number,
				default: 100000, // May need to be in ms
			},
		},
	},
	{ timestamps: true }
);

LootTableSchema.pre("save", function (next) {
	const totalChance = Object.values(this.items).reduce(
		(sum, tier) => sum + tier.chance,
		0
	);
	if (totalChance !== 100) {
		return next(new Error("The total chances must sum up to 100%."));
	}
	next();
});

const LootTable = mongoose.model("LootTable", LootTableSchema);
const PenalityTable = mongoose.model("PenalityTable", PenaltyTableSchema);

module.exports = { LootTable, PenalityTable };
