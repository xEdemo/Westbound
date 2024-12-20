use("Westbound");

const now = new Date();

db.crimes.createIndex({ name: 1 }, { unique: true });

db.getCollection("crimes").insertMany([
	{
		name: "Disposal",
		type: "Environmental",
		baseChanceToSucceed: 65,
		levelRequired: 1,
		createdAt: now,
		updated: now,
	},
	{
		name: "Arson",
		type: "Environmental",
		baseChanceToSucceed: 45,
		levelRequired: 10,
		createdAt: now,
		updated: now,
	},
]);
