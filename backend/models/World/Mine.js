const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {
	mineHazards,
	minePositiveEventType,
	mineNegativeEventType,
	mineTypeOfMine,
} = require("../../utils/enum.js");

// Mine Schema
const MineSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unqiue: true,
		},
		image: {
			type: String,
			required: true,
		},
		typeOfMine: {
			type: String,
			enum: mineTypeOfMine,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		location: {
			type: Schema.Types.ObjectId, // needs to ref fuckin town or country or whatever
			ref: "Country",
			required: true,
		},
		miningLevelRequirement: {
			type: Number,
			required: true,
		},
		resources: {
			// these number will have to sum to 100, and will act as percents/ percent chances
			iron: {
				type: Number,
				min: 0,
				max: 100,
				default: 0,
			},
			silver: {
				type: Number,
				min: 0,
				max: 100,
				default: 0,
			},
			gold: {
				type: Number,
				min: 0,
				max: 100,
				default: 0,
			},
			gems: {
				type: Number,
				min: 0,
				max: 100,
				default: 0,
			},
		},
		currentYield: {
			// granular vs aggregate tracking, ask steve
			// will be dynamic - steve
			type: Number,
			default: 0, // aggre - simplicity / fast implementation
		}, // granular - more complex resource mangement
		maxYield: {
			type: Number,
			required: true,
		},
        depths: [{
            equipmentRequired: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Item'
                // candle, enum with Ids eventually required
            },
            depth: {
                type: Number,       // need validation for maxDepth
            },

        }],
		hazards: {
			type: [String],
			enum: mineHazards,
			required: true,
		},
		maxDepth: {
			type: Number, // depth level of mine
			default: 10,
		},
		equipmentNeeded: [
			{
				type: String,
				enum: ["pickaxe"], // Temp
			},
		],
		events: {
			// need to be linked to some type math + probability
			positiveEventType: {
				type: [String],
				required: true,
			},
			negativeEventType: {
				type: [String],
				required: true,
			},
		},
		npcInteraction: {
			type: Schema.Types.ObjectId,
			ref: "Npc",
		},
	},
	{
		timestamps: true,
	}
);

MineSchema.pre("save", function (next) {
	const { iron = 0, silver = 0, gold = 0, gems = 0 } = this.resources || {};
	const total = iron + silver + gold + gems;

	if (total !== 100) {
		const err = new Error(
			"The sum of resources (iron, silver, gold, gems) must equal 100."
		);
		return next(err);
	}

	next();
});

MineSchema.pre("save", function (next) {
	const { typeOfMine, events } = this;

	if (!typeOfMine) {
		return next(new Error("typeOfMine is required for event validation."));
	}

	// Validate positiveEventType
	if (
		!events.positiveEventType.every((event) =>
			minePositiveEventType[typeOfMine]?.includes(event)
		)
	) {
		return next(
			new Error(
				`Invalid positiveEventType for typeOfMine '${typeOfMine}'. Allowed values: ${minePositiveEventType[
					typeOfMine
				]?.join(", ")}`
			)
		);
	}

	// Validate negativeEventType
	if (
		!events.negativeEventType.every((event) =>
			mineNegativeEventType[typeOfMine]?.includes(event)
		)
	) {
		return next(
			new Error(
				`Invalid negativeEventType for typeOfMine '${typeOfMine}'. Allowed values: ${mineNegativeEventType[
					typeOfMine
				]?.join(", ")}`
			)
		);
	}

	next();
});

// Model based on Schema
const Mine = mongoose.model("Mine", MineSchema);

// Export the model
module.exports = Mine;
