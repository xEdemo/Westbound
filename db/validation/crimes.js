const validateCrimeCreation = (crimes) => {
	const name = crimes?.name;
	const levelRequired = crimes?.levelRequired;
	const difficulty = crimes?.difficulty;
	const type = crimes?.type;
	const fineAmount = crimes?.fineAmount;
	const environmentalDamage = crimes?.environmentalDamage;
	const createdAt = crimes?.createdAt;
	const updatedAt = crimes?.updatedAt;

	if (!createdAt || !updatedAt) {
		console.log("Add createdAt and updatedAt to your object.");
		return {
			msg: "Add createdAt and updatedAt to your object."
		}
	}

	if (!name || !levelRequired || !difficulty || !type) {
		console.log(`Missing base required fields.`);
		return true;
	}
	if (typeof name !== "string" || typeof levelRequired !== "number" || typeof difficulty !== "number" || typeof type !== "string") {
		console.log( `Wrong data type(s). Name should be "string," levelRequired should be "number," difficulty should be "number," and type should be "string."`);
		return true;
	}

	if (type === "Financial") {
		if (!fineAmount) {
			console.log(`Please fill out the fineAmount required field.`);
			return true;
		}
		if (typeof fineAmount !== "number") {
			console.log(`Wrong type for fineAmount. Was read as ${typeof fineAmount} but should be number.`);
			return true;
		}
	} else if (type === "Environmental") {
		if (!environmentalDamage) {
			console.log(`Environmental crimes require environmentalDamage.`);
			return true;
		}
		if (typeof environmentalDamage !== "number") {
			console.log(`Wrong type for environmentalDamage. Was read as ${typeof environmentalDamage} but should be number.`);
			return true;
		}
	} else {
		console.log(`Invalid crime type`);
		return true
	}

	console.log("roonie");
	

	return false;
};

module.exports = {
	validateCrimeCreation
}