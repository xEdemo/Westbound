// Returns true if the value should be considered “empty”
const isEmptyValue = (val) => {
	// We want to keep booleans and numbers even if they are false or 0.
	if (typeof val === "boolean" || typeof val === "number") return false;
	if (typeof val === "string" && val.trim() === "") return true;
	if (val === null || val === undefined) return true;
	if (Array.isArray(val) && val.length === 0) return true;
	return false;
}

// Recursively remove keys with empty values. If the object ends up with no valid keys, return undefined.
const cleanObject = (obj) => {
	if (typeof obj !== "object" || obj === null) return obj;

	let hasValid = false;
	const cleaned = {};

	for (const key in obj) {
		if (!obj.hasOwnProperty(key)) continue;

		let value = obj[key];

		// Recursively clean nested objects.
		if (typeof value === "object" && !Array.isArray(value)) {
			value = cleanObject(value);
		} else if (Array.isArray(value)) {
			// Remove items from arrays that are empty
			const filtered = value.filter((item) => !isEmptyValue(item));
			value = filtered.length > 0 ? filtered : undefined;
		}

		// Only assign if the value is not empty.
		if (!isEmptyValue(value)) {
			cleaned[key] = value;
			hasValid = true;
		}
	}

	return hasValid ? cleaned : undefined;
}

module.exports = { cleanObject }
