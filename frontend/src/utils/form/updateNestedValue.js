export const updateNestedValue = (obj, path, value) => {
	const keys = path.split(".");
	const newObj = Array.isArray(obj) ? [...obj] : { ...obj };
	let current = newObj;
	keys.forEach((key, index) => {
		const isIndex = !isNaN(Number(key));
		const actualKey = isIndex ? Number(key) : key;
		// If we are at the last key, update the value
		if (index === keys.length - 1) {
			current[actualKey] = value;
		} else {
			// If the next level is undefined, create it.
			// Use an array if the next key appears to be a number.
			if (typeof current[actualKey] === "undefined") {
				const nextKey = keys[index + 1];
				current[actualKey] = !isNaN(Number(nextKey)) ? [] : {};
			} else {
				// Otherwise, clone the existing value.
				if (Array.isArray(current[actualKey])) {
					current[actualKey] = [...current[actualKey]];
				} else if (typeof current[actualKey] === "object") {
					current[actualKey] = { ...current[actualKey] };
				}
			}
			current = current[actualKey];
		}
	});

	return newObj;
};

export const getValue = (keyPath, obj) => {
	const keys = keyPath.split(".");
	let val = obj;
	for (let key of keys) {
		if (val == null) return "";
		val = val[key];
	}
	return val === undefined ? "" : val;
};
