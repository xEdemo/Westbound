/**
 * 
 * @param {*} low - low bound
 * @param {*} high - high bound
 * @returns A random number based on low and high bounds
 */
const getRandomLowHigh = (low, high) => {
	if (low > high) throw new Error("Low bound cannot be greater than high bound");
	return Math.floor(Math.random() * (high - low + 1)) + low;
};

module.exports = {
	getRandomLowHigh,
};
