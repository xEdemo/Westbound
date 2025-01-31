const { Inventory, Item } = require("../../models");

const hourlyItemCirculation = async () => {
	try {
		const tierCirculation = await Inventory.aggregate([
			{ $unwind: "$items" },
			{
				$group: {
					_id: {
						item: "$items.item",
						tier: "$items.tier",
					},
					totalQuantity: { $sum: "items.quantity" },
				},
			},
		]);

		const itemUpdates = new Map();

		for (const entry of tierCirculation) {
			const { item, tier } = entry._id;
			const quantity = entry.totalQuantity;

			if (!itemUpdates.has(item)) {
				itemUpdates.set(item, {
					total: 0,
					tier: {
						1: 0,
						2: 0,
						3: 0,
						4: 0,
						5: 0,
						6: 0,
						7: 0,
						8: 0,
						9: 0,
					},
				});
			}

			itemUpdates.get(item).tier[tier] = quantity;

			itemUpdates.get(item).total += quantity;
		}

		for (const [itemId, data] of itemUpdates) {
			await Item.findByIdAndUpdate(itemId, {
				$set: {
					"circulation.total": data.total,
					"circulation.tier": data.tier,
				},
			});
		}

		console.log("Item circulation update complete");
	} catch (err) {
		console.error("Error updating item circulation:", err);
	}
};

module.exports = hourlyItemCirculation;
