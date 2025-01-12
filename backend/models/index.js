const User = require("./User.js");
const { Crime, FinancialCrime, ViolentCrime, PropertyCrime, ProductionCrime } = require("./Crime.js");
const Item = require("./Item.js");
const { LootTable, PenaltyTable } = require("./LootAndPenaltyTable.js");

module.exports = {
	User,
	Crime,
	FinancialCrime,
	ViolentCrime,
	PropertyCrime,
	ProductionCrime,
	Item,
	LootTable,
	PenaltyTable,
}