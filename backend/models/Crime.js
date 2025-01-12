const mongoose = require("mongoose");
const { crimeType, crimeSubtype } = require("../utils/enum.js");

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
		subtype: {
			type: String,
			required: true,
			validate: {
				validator: function (value) {
					// Check if the subType exists within the corresponding type's array
					return crimeSubtype[this.type]?.includes(value);
				},
				message: (props) =>
					`${props.value} is not a valid subType for type ${props.instance.type}`,
			},
		},
		rewards: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "LootTable",
			required: true,
		},
		penalty: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "PenaltyTable",
			required: true,
		},
		difficulty: {
			type: Number,
			min: 0,
			max: 100,
			required: true,
		},
		levelRequired: {
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
	forgery: {
		counterfeitCurrency: {},
		documentForgery: {},
		falsifiedChecksAndBonds: {},
	},
	fraud: {
		debtBondage: {},
	},
	extortion: {
		blackmail: {},
	},
	loanSharking: {
		predatoryLending: {},
		intimidation: {},
	},
});

const ViolentCrimeSchema = new mongoose.Schema({
	assault: {
		simpleAssault: {},
		aggravatedAssault: {},
		battery: {},
		aggravatedBattery: {},
	},
	murder: {
		firstDegree: {},
		secondDegree: {},
		manslaughter: {},
	},
});

const PropertyCrimeSchema = new mongoose.Schema({
	sabotage: {
		infrastructure: {},
		machinery: {},
		transport: {},
	},
});

const Crime = mongoose.model("Crime", CrimeSchema);

const FinancialCrime = Crime.discriminator("Financial", FinancialCrimeSchema);
const ViolentCrime = Crime.discriminator("Violent", ViolentCrimeSchema);
const ProptertyCrime = Crime.discriminator("Property", PropertyCrimeSchema);

module.exports = { Crime, FinancialCrime, ViolentCrime, ProptertyCrime };
