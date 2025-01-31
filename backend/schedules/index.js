const userSchedule = require("./user/userSchedule.js");
const itemSchedule = require("./item/itemSchedule.js");

module.exports = () => {
	userSchedule();
	itemSchedule();
};
