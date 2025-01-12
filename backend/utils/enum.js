// Start crime schema

/**
 * @desc	Enum for crime schema
 */
const crimeType = ["financial", "violent", "property", "production"];

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

module.exports = {
	crimeType,
	itemCategory,
};
