const { User } = require("../../models/index.js");
const { calculateNetWorth } = require("../../utils/calculateNetWorth.js");

const dailyUserNetWorth = async () => {
	const currentDate = new Date().toISOString();
	const maxBackfillDays = 30; // Limit to 30 days of backfilling

	try {
		const users = await User.find()
			.populate("properties", "cost.marketValue.currentValue") // Only populate required fields
			.populate("inventory", "value");

		// Needed for batch updating
		const updatedUsers = [];

		for (const user of users) {
			const { netWorth } = user.progression;
			const lastUpdate =
				netWorth.lastNetWorthUpdate || new Date(user.createdAt);
			const lastUpdateDate = new Date(lastUpdate).setUTCHours(0, 0, 0, 0); //Normalize to 00:00 UTC
			const todayDate = new Date().setUTCHours(0, 0, 0, 0);

			const daysMissed = Math.min(
				Math.floor(
					(todayDate - lastUpdateDate) / (24 * 60 * 60 * 1000)
				),
				maxBackfillDays
			);

			if (daysMissed > 0) {
				let newNetWorth = netWorth.current;

				for (let i = 1; i <= daysMissed; i++) {
					const missedDate = new Date(
						lastUpdateDate + i * 24 * 60 * 60 * 1000
					).toISOString();

					// Avoid duplicate entries
					if (
						!netWorth.dailyChange.some(
							(entry) => entry.day === missedDate
						)
					) {
						const change = calculateNetWorth(user) - newNetWorth;

						netWorth.dailyChange.push({
							day: missedDate,
							change,
						});

						newNetWorth += change;
					}
				}

				netWorth.current = newNetWorth;
				netWorth.lastNetWorthUpdate = currentDate;

				updatedUsers.push(user);
			}
		}

		await Promise.all(updatedUsers.map((user) => user.save()));

		console.log(
			"Daily net worth calculation completed, including missed updates."
		);
	} catch (err) {
		console.error("Error during daily net worth calculation:", err);
	}
};

module.exports = dailyUserNetWorth;
