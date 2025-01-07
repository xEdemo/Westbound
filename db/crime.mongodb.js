const { validateCrimeCreation } = require("./validation/crimes.js");

use("Westbound");

const now = Date.now();

db.crimes.createIndex({ name: 1 }, { unique: true });

const crime = {
	name: "Ar",
	type: "Environmental",
	difficulty: 1,
	levelRequired: 1,
	environmentalDamage: 2,
	createdAt: now,
}

const validationError = validateCrimeCreation(crime);
if (!validationError) {
	db.crimes.insertOne(crime);
} else {
	console.log(validationError.msg)
}

