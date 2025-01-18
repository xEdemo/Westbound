// Start crime schema

/**
 * @desc	Enum for crime schema
 */
const crimeType = ["financial", "violent", "property", "production"];

/**
 * @desc	Validator for crime schema
 */
const crimeSubtype = {
	financial: ["forgery", "fraud", "extortion", "loanSharking"],
	violent: ["assault", "murder"],
	property: ["sabotage"],
};

// End crime schema
// Start item schema

/**
 * @desc	Enum for item schema
 */
const itemCategory = [
	"primaryWeapon",
	"secondaryWeapon",
	"meleeWeapon",
	"consumableWeapon",
	"armour",
	"garments",
	"medical",
	"intoxicants",
	"supplies",
	"tools",
	"materials",
	"miscellaneous",
];

// END item dchema
// Start mine Schema

const mineTypeOfMine = ["iron", "silver", "gold", "gem"];

const mineHazards = ["Cave-In", "Gas Leak", "Rockfall", "Flooding"];

const minePositiveEventType = {
	// how 2 implement properly?
	iron: [
		"Ore Vein Discovery", // iron
		"High Yield Extraction", // iron
		"Dense Deposit", // iron
		"High Purity Ore", // iron
	],
	silver: [
		"Ore Vein Discovery", // silver
		"High Yield Extraction", // silver
		"High Purity Ore", // silver
	],
	gold: [
		"Ore Vein Discovery", // gold
		"High Yield Extraction", // gold
	],
	gems: [
		"Ore Vein Discovery", // gems
		"High Yield Extraction", // gems
	],
};

const mineNegativeEventType = {
	iron: [
		"Vein Collapse", // iron
		"Rockfall Incident", // iron
		"Ore Contamination", // iron
		"Flooding", // iron
	],
	silver: [
		"Vein Collapse", // silver
		"Rockfall Incident", // silver
		"Ore Contamination", // silver
		"Flooding", // silver
	],
	gold: [
		"Vein Collapse", // gold
		"Rockfall Incident", // gold
		"Ore Contamination", // gold
		"Flooding", // gold
	],
	gems: [
		"Vein Collapse", // gems
		"Rockfall Incident", // gems
		"Ore Contamination", // gems
		"Flooding", // gems
	],
};

module.exports = {
	//crimeSchema
	crimeType,
	crimeSubtype,
	//itemSchema
	itemCategory,
	//mineSchema
	mineTypeOfMine,
	mineHazards,
	minePositiveEventType,
	mineNegativeEventType,
};
