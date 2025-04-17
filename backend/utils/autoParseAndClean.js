const isEmptyValue = (val) => {
	// We want to keep booleans and numbers even if they are false or 0.
	if (typeof val === "boolean" || typeof val === "number") return false;
	if (typeof val === "string" && val.trim() === "") return true;
	if (val === null || val === undefined) return true;
	if (Array.isArray(val) && val.length === 0) return true;
	return false;
};

/**
 * Recursively parse and clean data.
 * Heuristics:
 * - If a string starts with '{' or '[', try parsing it as JSON.
 * - If a string is "true" or "false", convert it to a Boolean.
 * - Recursively clean objects and arrays.
 *
 * @param {*} data - The input data.
 * @returns {*} - The parsed and cleaned data.
 */
const autoParseAndClean = (data) => {
	// If data is a string, try to convert it
	if (typeof data === "string") {
		const trimmed = data.trim();

		// If the trimmed string is empty, return it immediately (do not convert to number)
		if (trimmed === '') return data;

		// Try to parse JSON if it looks like an object or array.
		if (
			(trimmed.startsWith("{") && trimmed.endsWith("}")) ||
			(trimmed.startsWith("[") && trimmed.endsWith("]"))
		) {
			try {
				return autoParseAndClean(JSON.parse(trimmed));
			} catch (err) {
				// If JSON parse fails, we just continue.
			}
		}

		// Convert boolean-like strings.
		if (trimmed.toLowerCase() === "true") return true;
		if (trimmed.toLowerCase() === "false") return false;

		// Convert undefined string to undefined
		if (trimmed === "undefined") return undefined;

		// Convert numeric strings to numbers.
		const num = Number(trimmed);
		if (!isNaN(num)) return num;

		// Otherwise, return the original string.
		return data;
	}

	// If the data is an array, process each item.
	if (Array.isArray(data)) {
		const cleanedArray = data
			.map((item) => autoParseAndClean(item))
			.filter((item) => !isEmptyValue(item));
		return cleanedArray;
	}

	// If the data is an object, walk through each key.
	if (typeof data === "object" && data !== null) {
		const cleanedObject = {};
		for (const key in data) {
			if (!Object.prototype.hasOwnProperty.call(data, key)) continue;
			const cleanedValue = autoParseAndClean(data[key]);
			if (!isEmptyValue(cleanedValue)) {
				cleanedObject[key] = cleanedValue;
			}
		}
		// If the cleaned object has no keys, return undefined.
		return Object.keys(cleanedObject).length > 0
			? cleanedObject
			: undefined;
	}

	// For all other types (number, boolean, etc.), return as is.
	return data;
};

module.exports = {
	autoParseAndClean,
};
