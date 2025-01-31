const cron = require("node-cron");
const { hourlyItemCirculation } = require(".")

module.exports = () => {
	cron.schedule("0 * * * *", async () => {
		console.log("Running hourly item circulation update...")
		hourlyItemCirculation();
	});
}