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
	forgery: {
		forgedCounterfeitCurrency: {

		},
		forgedDocuments: {

		},
		forgedFalsifiedChecksAndBonds: {

		},
		forgedIdentityDocuments: {

		},
	},
	fraud: {
		financialFraud: {

		},
		insuranceFraud: {

		},
		investmentFraud: {
		
		},
		ponziFraud: {
		
		},

	},
	extortion: {
		coercion: {

		},
		protectionRacket: {

		},
		blackmail: {

		},
		intimidation: {

		},
	},
	loanSharking: {
		predatoryLending: {

		},
		usuriousInterest: {
			
		},
		collateralSeizure: {
			
		},
		debtBondage: {
			
		},
	},
});
const ProductionCrimeSchema = new mongoose.Schema({
	moonshining: {
		preparation: {

		},
		cultivation: {

		},
		harvest: {

		},
		distribution: {

		},
	},
	peyoteCultivation: {
		preparation: {

		},
		cultivation: {

		},
		harvest: {

		},
		distribution: {

		},
	},
	opiumDenOperation: {
		preparation: {

		},
		cultivation: {

		},
		harvest: {

		},
		distribution: {

		},
	},
	cannabisFarming: {
		preparation: {

		},
		cultivation: {

		},
		harvest: {

		},
		distribution: {

		},
	},
});


const ViolentCrimeSchema = new mongoose.Schema({
	assault: {
		simpleAssault: {
			
		},
		aggravatedAssault: {
			
		},
		battery: {
			
		},
		aggravatedBattery: {
			
		},
	},
	robbery: {
		unarmedRobbery: {
	
		},
		armedRobbery: {
	
		},
		horsejacking: {
	
		},
		homeInvasion: {
	
		},
	},
	kidnapping: {
		politicalKidnapping: {
	
		},
		ransomKidnapping: {
	
		},
		kidnappingForRetribution: {
	
		},
		ritualisticKidnapping: {
	
		},
	},
	
	murder: {
		manslaughter: {
			
		},
		thirdDegree: {
			
		},
		secondDegree: {
			
		},
		firstDegree: {
			
		},
	},
});

const PropertyCrimeSchema = new mongoose.Schema({
	theft: {
        pettyLarceny: {

        },
        grandLarceny: {

        },
        propertyTheft: {

		},
		animalTheft: {

		},
    },
    burglary: {
        residentialBurglary: {

        },
        commercialBurglary: {

        },
        saloonRobbery: {

        },
        bankRobbery: {

        },
    },
    arson: {
		accidentalArson: {

        },
        intentionalArson: {

        },
        arsonWithIntentToDefraud: {

        },
        wildlandArson: {

        },
    },
    vandalism: {
        defacement: {

        },
        fenceCutting: {

        },
        mineSabotage: {

        },
        wellPollution: {

        },
    },
	
});

const Crime = mongoose.model("Crime", CrimeSchema);

const FinancialCrime = Crime.discriminator("Financial", FinancialCrimeSchema);
const ViolentCrime = Crime.discriminator("Violent", ViolentCrimeSchema);
const PropertyCrime = Crime.discriminator("Property", PropertyCrimeSchema);
const ProductionCrime = Crime.discriminator("Production", ProductionCrimeSchema);
module.exports = { Crime, FinancialCrime, ViolentCrime, PropertyCrime, ProductionCrime };
