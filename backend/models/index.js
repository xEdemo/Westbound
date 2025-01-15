const User = require("./User.js");
const {
	Crime,
	FinancialCrime,
	ViolentCrime,
	PropertyCrime,
	ProductionCrime,
} = require("./Crime.js");
const Item = require("./Item/Item.js");
const { LootTable, PenaltyTable } = require("./Item/LootAndPenaltyTable.js");
const World = require("./World/World.js");
const Npc = require("./Npc.js");

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
	World,
	Npc,
};
