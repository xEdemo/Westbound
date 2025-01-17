const bloodType = [
	{ type: "O+", chance: 35 },
	{ type: "O-", chance: 13 },
	{ type: "AB-", chance: 1 },
	{ type: "AB+", chance: 2 },
	{ type: "A+", chance: 30 },
	{ type: "A-", chance: 9 },
	{ type: "B+", chance: 8 },
	{ type: "B-", chance: 2 },
];

const selectRandomBloodType = () => {
	// Calculate cumulative ranges
	const cumulative = bloodType.reduce((acc, item) => {
		const lastMax = acc.length ? acc[acc.length - 1].max : 0;
		acc.push({ ...item, min: lastMax, max: lastMax + item.chance });
		return acc;
	}, []);

	// Generate random number between 0 and 100
	const randomNumber = Math.floor(Math.random() * 101);

	// Find the blood type that matches the random number
	const selectedBloodType = cumulative.find(
		(item) => randomNumber >= item.min && randomNumber < item.max
	);

	return selectedBloodType.type;
};

module.exports = { selectRandomBloodType };
