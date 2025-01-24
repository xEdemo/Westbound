export const calculateXpForNextUserLevel = (currentXp, currentLevel) => {
	const xpThreshold = 225;
	const xpMultiplier = 1.107633;

	const currentLevelXp = xpThreshold * Math.pow(xpMultiplier, currentLevel);
	const nextLevelXp = xpThreshold * Math.pow(xpMultiplier, currentLevel + 1);
	const neededXp = Math.ceil(nextLevelXp - currentXp);

	return {
		currentLevelXp: Math.floor(currentLevelXp),
		nextLevelXp: Math.ceil(nextLevelXp) - 250,
		neededXp: neededXp,
	};
};
