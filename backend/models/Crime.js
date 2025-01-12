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
