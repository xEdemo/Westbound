// Start crime schema

/**
 * @desc	Enum for crime schema
 */
const crimeType = ["financial", "violent", "property"];

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
	"drugs",
	"supplies",
	"tools",
	"materials",
	"miscellaneous",
];

module.exports = {
	crimeType,
	crimeSubtype,
	itemCategory,
};
