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
		difficulty: {
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
		discriminatorKey: "true",
	}
);

const FinancialCrimeSchema = new mongoose.Schema({
	// Can put someting here that applies to all financial crimes if needed
	fineAmount: { 
		type: Number, 
		required: true 
	},


	

	forgery: {
		counterfeitCurrency: {
			resourceCost: {

			},
		},
		documentForgery: {
			document: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Item",
			},
			resourcesNeeded: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Item",
			},
		},
		falifiedChecksAndBonds: {

		},
	},
	fraud: {
		debtBondage: {

		},
	},
	extortion: {

	},
	loanSharking: {

	},
});

const EnvironmentalCrimeSchema = new mongoose.Schema({
	// Applies to all environmental crimes if needed
	environmentalDamage: { 
		type: Number, 
		min: 0, 
		max: 100, 
		required: true 
	},
}); 

const Crime = mongoose.model("Crime", CrimeSchema);

const FinancialCrime = Crime.discriminator("Financial", FinancialCrimeSchema);

const EnvironmentalCrime = Crime.discriminator(
	"Environment",
	EnvironmentalCrimeSchema
);

module.exports = { Crime, FinancialCrime, EnvironmentalCrime };
