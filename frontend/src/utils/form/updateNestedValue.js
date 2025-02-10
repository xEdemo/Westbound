export const updateNestedValue = (obj, keyPath, newValue) => {
	const keys = keyPath.split(".");
	const updated = { ...obj };
	let current = updated;
	for (let i = 0; i < keys.length - 1; i++) {
		current[keys[i]] = { ...current[keys[i]] };
		current = current[keys[i]];
	}
	current[keys[keys.length - 1]] = newValue;
	return updated;
}

export const getValue = (keyPath, obj) => {
	const keys = keyPath.split(".");
	let val = obj;
	for (let key of keys) {
		if (val == null) return "";
		val = val[key];
	}
	return val === undefined ? "" : val;
}
