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
const Country = require("./World/Country.js");
const Npc = require("./Npc.js");
const Bank = require("./World/Bank.js");
const Mine = require("./World/Mine.js");
const Hospital = require("./World/Travel/Hospital.js");
const Property = require("./World/Property/Property.js");

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
	Country,
	Bank,
	Npc,
	Mine,
	Hospital,
	Property,
};
