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


	

	Forgery: {
		counterfeitCurrency: {
		  successChance: { type: Number, min: 0, max: 100, default: 80 },
		  staminaCost: { type: Number, default: 15 },
		  potentialRewards: {
			type: mongoose.Schema.Types.Mixed, 
			default: { cash: 1000, items: ["counterfeit bills"], reputation: 5 },
		  },
		  potentialPenalties: {
			type: mongoose.Schema.Types.Mixed, 
			default: { penalty: "imprisonment", jailTime: "5 years" },
		  },
		},
		documentForgery: {
		  successChance: { type: Number, min: 0, max: 100, default: 75 },
		  staminaCost: { type: Number, default: 20 },
		  potentialRewards: {
			type: mongoose.Schema.Types.Mixed, 
			default: { cash: 500, items: ["forged passport"], reputation: 10 },
		  },
		  potentialPenalties: {
			type: mongoose.Schema.Types.Mixed, 
			default: { penalty: "fines", arrestChance: 40, jailTime: "2 years" },
		  },
		},
		falsifiedChecksAndBonds: {
		  successChance: { type: Number, min: 0, max: 100, default: 60 },
		  staminaCost: { type: Number, default: 25 },
		  potentialRewards: {
			type: mongoose.Schema.Types.Mixed, 
			default: { cash: 3000, items: ["falsified bonds"] },
		  },
		  potentialPenalties: {
			type: mongoose.Schema.Types.Mixed, 
			default: { penalty: "heavy fines", arrestChance: 60, jailTime: "5 years" },
		  },
		},
	  },
	  Fraud: {
		debtBondage: {
		  successChance: { type: Number, min: 0, max: 100, default: 70 },
		  staminaCost: { type: Number, default: 30 },
		  potentialRewards: {
			type: mongoose.Schema.Types.Mixed, 
			default: { cash: 1000, items: ["loan documents"] },
		  },
		  potentialPenalties: {
			type: mongoose.Schema.Types.Mixed, 
			default: { penalty: "restitution", arrestChance: 50, jailTime: "3 years" },
		  },
		},
	  },
	  Extortion: {
		blackmail: {
		  successChance: { type: Number, min: 0, max: 100, default: 85 },
		  staminaCost: { type: Number, default: 10 },
		  potentialRewards: {
			type: mongoose.Schema.Types.Mixed, 
			default: { cash: 2000, items: ["sensitive documents"] },
		  },
		  potentialPenalties: {
			type: mongoose.Schema.Types.Mixed, 
			default: { penalty: "imprisonment", arrestChance: 70, jailTime: "10 years" },
		  },
		},
	  },
	  LoanSharking: {
		predatoryLending: {
		  successChance: { type: Number, min: 0, max: 100, default: 65 },
		  staminaCost: { type: Number, default: 20 },
		  potentialRewards: {
			type: mongoose.Schema.Types.Mixed, 
			default: { cash: 5000, items: ["debtor's contract"], reputation: 15 },
		  },
		  potentialPenalties: {
			type: mongoose.Schema.Types.Mixed, 
			default: { penalty: "fines", arrestChance: 50, jailTime: "5 years" },
		  },
		},
		intimidation: {
		  successChance: { type: Number, min: 0, max: 100, default: 75 },
		  staminaCost: { type: Number, default: 30 },
		  potentialRewards: {
			type: mongoose.Schema.Types.Mixed, 
			default: { cash: 3000, items: ["threatening letter"], reputation: 10 },
		  },
		  potentialPenalties: {
			type: mongoose.Schema.Types.Mixed, 
			default: { penalty: "assault charge", arrestChance: 60, jailTime: "2 years" },
		  },
		},
	  },
	});

module.exports = mongoose.model("PropertyCrime", PropertyCrimeSchema);

const ViolentCrimeSchema = new mongoose.Schema({
	Assault: {
	  simpleAssault: {
		successChance: { type: Number, min: 0, max: 100, default: 70 }, // % chance of success
		staminaCost: { type: Number, default: 10 }, // Cost in stamina to perform
		potentialRewards: {
		  type: mongoose.Schema.Types.Mixed, 
		  default: { cash: 50, items: ["knife", "wallet"] }, // Example rewards (can be improved with a loot table system)
		},
		potentialPenalties: {
		  type: mongoose.Schema.Types.Mixed,
		  default: { injury: "minor", arrestChance: 20 }, // Example penalties (can link to health and arrest systems)
		},
	  },
	  aggravatedAssault: {
		successChance: { type: Number, min: 0, max: 100, default: 50 },
		staminaCost: { type: Number, default: 20 },
		potentialRewards: {
		  type: mongoose.Schema.Types.Mixed, 
		  default: { cash: 200, items: ["gold watch"], reputation: 5 },
		},
		potentialPenalties: {
		  type: mongoose.Schema.Types.Mixed, 
		  default: { injury: "serious", arrestChance: 50, jailTime: "1 year" },
		},
	  },
	  battery: {
		successChance: { type: Number, min: 0, max: 100, default: 65 },
		staminaCost: { type: Number, default: 15 },
		potentialRewards: {
		  type: mongoose.Schema.Types.Mixed, 
		  default: { cash: 100, respect: 2 },
		},
		potentialPenalties: {
		  type: mongoose.Schema.Types.Mixed, 
		  default: { injury: "moderate", arrestChance: 30 },
		},
	  },
	  aggravatedBattery: {
		successChance: { type: Number, min: 0, max: 100, default: 40 },
		staminaCost: { type: Number, default: 30 },
		potentialRewards: {
		  type: mongoose.Schema.Types.Mixed, 
		  default: { cash: 500, loot: ["diamond ring"], reputation: 10 },
		},
		potentialPenalties: {
		  type: mongoose.Schema.Types.Mixed, 
		  default: { injury: "critical", arrestChance: 70, jailTime: "5 years" },
		},
	  },
	},
	Murder: {
	  firstDegree: {
		successChance: { type: Number, min: 0, max: 100, default: 30 },
		staminaCost: { type: Number, default: 50 },
		potentialRewards: {
		  type: mongoose.Schema.Types.Mixed, 
		  default: { cash: 5000, property: ["estate"], notoriety: 50 },
		},
		potentialPenalties: {
		  type: mongoose.Schema.Types.Mixed, 
		  default: { penalty: "death", jailTime: "lifetime" },
		},
	  },
	  secondDegree: {
		successChance: { type: Number, min: 0, max: 100, default: 45 },
		staminaCost: { type: Number, default: 40 },
		potentialRewards: {
		  type: mongoose.Schema.Types.Mixed, 
		  default: { cash: 3000, reputation: 20 },
		},
		potentialPenalties: {
		  type: mongoose.Schema.Types.Mixed, 
		  default: { injury: "critical", arrestChance: 80, jailTime: "20 years" },
		},
	  },
	  manslaughter: {
		successChance: { type: Number, min: 0, max: 100, default: 55 },
		staminaCost: { type: Number, default: 25 },
		potentialRewards: {
		  type: mongoose.Schema.Types.Mixed, 
		  default: { cash: 1500, lowRisk: true },
		},
		potentialPenalties: {
		  type: mongoose.Schema.Types.Mixed, 
		  default: { injury: "moderate", arrestChance: 60, jailTime: "10 years" },
		},
	  },
	},},

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
		  default: { injury: "severe", arrestChance: 60, jailTime: "2 years" },
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
  
  module.exports = mongoose.model("ViolentCrime", ViolentCrimeSchema);
  


const Crime = mongoose.model("Crime", CrimeSchema);

const FinancialCrime = Crime.discriminator("Financial", FinancialCrimeSchema);

const EnvironmentalCrime = Crime.discriminator("Environment",EnvironmentalCrimeSchema);

const ViolentCrime = Crime.discriminator("Violent", ViolentCrimeSchema);

module.exports = { Crime, FinancialCrime, EnvironmentalCrime, ViolentCrime };
