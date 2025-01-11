const mongoose = require("mongoose");
const { crimeType } = require("../utils/enum.js")

const CrimeSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			enum: crimeType,
			required: true,
		},
		rewards: {
			// Could be items, money, etc. (would have to make a loot table)
			type: mongoose.Schema.Types.ObjectId, // Flexible for different data types
			ref: "LootTable",
			required: true,
		},
		penalty: {
			// Could be many things and could vary (maybe a penalty table?)
			type: mongoose.Schema.Types.ObjectId,
			ref: "PenalityTable",
			required: true,
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
			required: true,
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
			
		},
		machinery: {
			
		},
		transport: {
			
		},
	},
});

const Crime = mongoose.model("Crime", CrimeSchema);

const FinancialCrime = Crime.discriminator("Financial", FinancialCrimeSchema);
const ViolentCrime = Crime.discriminator("Violent", ViolentCrimeSchema);
const ProptertyCrime = Crime.discriminator("Property", PropertyCrimeSchema);

module.exports = { Crime, FinancialCrime, ViolentCrime, ProptertyCrime };
