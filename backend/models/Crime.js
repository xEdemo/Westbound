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
		successChance: {
			type: Number,
			min: 0,
			max: 100,
		},
		staminaCost: {
			type: Number,
			default: 5,
		},
	},
	{
		timestamps: true,
		discriminatorKey: "true",
	}
);

const FinancialCrimeSchema = new mongoose.Schema({
	Forgery: {
		counterfeitCurrency: {

		},
		documentForgery: {

		},
		falsifiedChecksAndBonds: {

		},
	},
	Fraud: {
		debtBondage: {

		},
	},
	Extortion: {
		blackmail: {

		},
	},
	LoanSharking: {
		predatoryLending: {

		},
		intimidation: {
			
		},
	},
});

const ViolentCrimeSchema = new mongoose.Schema({
	Assault: {
		simpleAssault: {
			
		},
		aggravatedAssault: {
			
		},
		battery: {
			
		},
		aggravatedBattery: {
			
		},
	},
	Murder: {
		firstDegree: {
			
		},
		secondDegree: {
			
		},
		manslaughter: {
			
		},
	},
});

const PropertyCrimeSchema = new mongoose.Schema({
	Sabotage: {
		infrastructure: {
			successChance: { type: Number, min: 0, max: 100, default: 60 },
			staminaCost: { type: Number, default: 20 },
			potentialRewards: {
				type: mongoose.Schema.Types.Mixed,
				default: { disruption: 50, loot: ["tools"] },
			},
			potentialPenalties: {
				type: mongoose.Schema.Types.Mixed,
				default: { injury: "minor", arrestChance: 30 },
			},
		},
		machinery: {
			successChance: { type: Number, min: 0, max: 100, default: 50 },
			staminaCost: { type: Number, default: 25 },
			potentialRewards: {
				type: mongoose.Schema.Types.Mixed,
				default: { cash: 300, loot: ["spare parts"], reputation: 5 },
			},
			potentialPenalties: {
				type: mongoose.Schema.Types.Mixed,
				default: {
					injury: "severe",
					arrestChance: 60,
					jailTime: "2 years",
				},
			},
		},
		transport: {
			successChance: { type: Number, min: 0, max: 100, default: 45 },
			staminaCost: { type: Number, default: 30 },
			potentialRewards: {
				type: mongoose.Schema.Types.Mixed,
				default: { cash: 500, supplies: ["fuel", "cargo"] },
			},
			potentialPenalties: {
				type: mongoose.Schema.Types.Mixed,
				default: { injury: "critical", arrestChance: 75 },
			},
		},
	},
});

const Crime = mongoose.model("Crime", CrimeSchema);

const FinancialCrime = Crime.discriminator("Financial", FinancialCrimeSchema);
const ViolentCrime = Crime.discriminator("Violent", ViolentCrimeSchema);
const ProptertyCrime = Crime.discriminator("Property", PropertyCrimeSchema);

module.exports = { Crime, FinancialCrime, ViolentCrime, ProptertyCrime };
