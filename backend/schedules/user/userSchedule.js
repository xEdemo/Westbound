const cron = require("node-cron");
const { dailyUserNetWorth } = require(".");

module.exports = () => {
	// Calculate user net worth every day at 00:00 UTC
	cron.schedule("0 0 * * *", async () => {
		console.log("Running daily net worth calculation at 00:00 UTC");
		await dailyUserNetWorth();
	});

	cron.schedule("*/5 * * * *", () => {
		console.log(`Every five minutes starting at 00 minutes`);
	});
};
