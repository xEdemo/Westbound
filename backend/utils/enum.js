// Start crime schema

/**
 * @desc	Enum for crime schema
 */
const crimeType = ["Financial", "Violent", "Property"];

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
	itemCategory,
};
