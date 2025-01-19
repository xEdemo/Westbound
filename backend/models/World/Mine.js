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
			type: Schema.Types.ObjectId, // needs to ref fuckin states or country or whatever
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
		hazards: {
			type: [String],
			enum: mineHazards,
			// enum: [
			//     "Cave-In",
			//      "Gas Leak",
			//      "Rockfall",
			//      "Flooding",
			//     ],
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
				// TODO: add to enumJS
				type: [String],
				// enum: [
				//     iron: [
				//         "Ore Vein Discovery",		// iron
				//         "High Yield Extraction",	// iron
				//         "Dense Deposit",			// iron
				//         "High Purity Ore",			// iron
				//         ],
				//         silver: [
				//         "Ore Vein Discovery",		// silver
				//         "Ore Vein Discovery",		// silver
				//         "High Yield Extraction",	// silver
				//         "High Purity Ore",			// silver
				//         ],
				//         gold: [
				//         "Ore Vein Discovery",		// gold
				//         "High Yield Extraction",	// gold
				//         "",							// gold
				//         "",							// gold
				//         ],
				//         gems: [
				//         "Ore Vein Discovery",		// gems
				//         "High Yield Extraction",	// gems
				//         "",							// gems
				//         "",							// gems
				//         ],
				// ],
				required: true,
			},
			negativeEventType: {
				// // TODO: add to enumJS
				type: [String],
				// enum: [
				//     iron: [
				//         "Vein Collapse",			// iron
				//         "Rockfall Incident",		// iron
				//         "Ore Contamination",		// iron
				//         "Flooding",					// iron
				//         ],
				//         silver: [
				//         "Vein Collapse",			// silver
				//         "Rockfall Incident",		// silver
				//         "Ore Contamination",		// silver
				//         "Flooding",					// silver
				//         "",							// silver
				//         ],
				//         gold: [
				//         "Vein Collapse",			// gold
				//         "Rockfall Incident",		// gold
				//         "Ore Contamination",		// gold
				//         "Flooding",					// gold
				//         ],
				//         gems: [
				//         "Vein Collapse",			// gems
				//         "Rockfall Incident",		// gems
				//         "Ore Contamination",		// gems
				//         "Flooding",					// gems
				//         ],
				// ],
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
