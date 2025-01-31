const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { Country } = require("../../models");

/**
 * @desc	Creates a country
 * @route	POST /api/v1/country
 * @access	Super Admin
 */
const createCountry = asyncHandler(async (req, res) => {
	const { name, description } = req.body;
	if (!name) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`Please fill out all required fields.`);
	}
	const country = await Country.create({
		name,
		description,
	});
	res.status(StatusCodes.OK).json({ country });
});

/**
 * @desc	Get all countries
 * @route	Get /api/v1/country
 * @access	Private
 */
const getAllCountries = asyncHandler(async (req, res) => {
	const countries = await Country.find({}).select("-__v").sort("name");
	res.status(StatusCodes.OK).json({ count: countries.length, countries });
});

/**
 * @desc	Updates a country
 * @route	PUT /api/v1/country/:countryId
 * @access	Super Admin
 */
const updateCountryById = asyncHandler(async (req, res) => {
	const { countryId } = req.params;
	const { name, description } = req.body;

	const country = await Country.findById(countryId);

	if (!country) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`Country with ID ${countryId} not found.`);
	}

	if (name && name !== country.name) {
		// Check to see if this name already exists for another country due to unique field
		const isExist = await Country.findOne({ name });
		if (isExist) {
			res.status(StatusCodes.CONFLICT);
			throw new Error(
				`A country with the name '${name}' already exists.`
			);
		}
		// If check passes, change the name of the country
		country.name = name;
	}
	if (description && description !== country.description) {
		country.description = description;
	}
	// Save the document after all changes have been completed
	await country.save();

	res.status(StatusCodes.OK).json({ country });
});

/**
 * @desc	Deletes a country
 * @route	DELETE /api/v1/country/:countryId
 * @access	Super Admin
 */
const deleteCountryById = asyncHandler(async (req, res) => {
	const { countryId } = req.params;

	const country = await Country.findById(countryId);
	if (!country) {
		res.status(StatusCodes.NOT_FOUND);
		throw new Error(
			`Country with ID ${countryId} not found in country records.`
		);
	}
	// Delete everyhwere where country is referenced (look at deleteCrimeById in crimeController.js)

	await country.deleteOne();

	res.status(StatusCodes.OK).json({
		msg: `${country.name} with ID ${countryId} successfully deleted.`,
	});
});

/**
 * @desc	Creates a new state in a country
 * @route	PUT /api/v1/country/state/:countryId
 * @access	Super Admin
 */
const createState = asyncHandler(async (req, res) => {
	const { countryId } = req.params;
	const { name, description, population } = req.body;

	const country = await Country.findById(countryId);

	if (!country) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`Country with ID '${countryId}' not found.`);
	}

	country.states.push({
		name,
		description,
		population,
		banks: [],
		towns: [],
	});

	await country.save();

	res.status(StatusCodes.OK).json({ country });
});

/**
 * @desc	Creates a new town in a state
 * @route	PUT /api/v1/country/town/:countryId/:stateId
 * @access	Super Admin
 */
const createTown = asyncHandler(async (req, res) => {
	const { countryId, stateId } = req.params;
	const { name, description, type } = req.body;

	const country = await Country.findById(countryId);

	if (!country) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`Country with ID '${countryId}' not found.`);
	}

	const state = country.states.find(
		(s, index) => s._id.toString() === stateId.toString()
	);

	if (!state) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(
			`State with ID '${stateId}' not found in country '${countryId}'.`
		);
	}

	state.towns.push({
		name,
		description,
		type,
		storefronts: [],
	});
	await country.save();

	res.status(StatusCodes.OK).json({ state });
});

module.exports = {
	createCountry,
	getAllCountries,
	updateCountryById,
	deleteCountryById,
	createState,
	createTown,
};
