/**
 *
 * @param {*} xp - The current xp that the user has (after change)
 * @param {*} currentLevel - The level that the user holds (before level)
 * @returns the same or increased level based on xp cutoffs
 */
const calculateUserLevel = (xp, currentLevel) => {
	const xpThreshold = 225;
	const xpMultiplier = 1.107633; // Exponential multiplier for leveling up; 1.119 for RuneScape
	const level = Math.max(
		currentLevel,
		Math.floor(Math.log(xp / xpThreshold) / Math.log(xpMultiplier))
	);
	return level;
};

/**
 *
 * @param {*} xp - The current xp that the user has (after change)
 * @param {*} currentLevel - The level that the user holds (before level)
 * @returns the same or increased level based on xp cutoffs
 */
const calculateCrimeLevel = (xp, currentLevel) => {
	let level = currentLevel;

	// Calculate total XP required to reach the next level
	let requiredXp = 25 * level * (level + 1);

	// Loop until the XP is less than the required XP or level reaches 200
	while (xp >= requiredXp && level < 200) {
		level++;
		requiredXp = 25 * level * (level + 1);
	}

	return level;
};

module.exports = {
	calculateUserLevel,
	calculateCrimeLevel,
};
