const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { Country, Bank } = require("../models");

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
 * @desc	Creates a new state in a country
 * @route	PUT /api/v1/country/:countryId
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
 * @route	PUT /api/v1/country/:countryId/:stateId
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

	const state = country.states.find((s, index) => s._id.toString() === stateId.toString());

	if (!state) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`State with ID '${stateId}' not found in country '${countryId}'.`);
	  }

	state.towns.push({
		name,
		description,
		type,
		storefronts: [],
	})
	await country.save();

	res.status(StatusCodes.OK).json({ state })
});

module.exports = {
	createCountry,
	createState,
	createTown,
};
