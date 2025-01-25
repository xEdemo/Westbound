const calculateNetWorth = (user) => {
	const { currencies, properties, inventory } = user;

	const totalPropertyValue = properties.reduce(
		(total, property) =>
			total + (property.cost?.marketValue?.currentValue || 0),
		0
	);

	const inventoryValue = inventory?.value || 0;

	const totalNetWorth =
		(currencies?.greenbacks || 0) +
		(currencies?.silverDollars || 0) +
		totalPropertyValue +
		inventoryValue;

	return totalNetWorth;
};

module.exports = {
	calculateNetWorth
}
