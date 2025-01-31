const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { Hospital } = require("../../models/Misc");

/**
 * @desc	Creates a hospital
 * @route	POST /api/v1/hospital
 * @access	Super Admin
 */

const createHospital = asyncHandler(async (req, res) => {
	const { name, description, location, users, staff, services, hazards } =
		req.body;
	if (!name) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`Please fill out all required fields.`);
	}
	const hospital = await Hospital.create({
		name,
		description,
		location,
		users,
		staff,
		services,
		hazards,
	});
	res.status(StatusCodes.OK).json({ hospital });
});

/**
 * @desc	Get all hospitals
 * @route	Get /api/v1/hospital
 * @access	Private
 */
const getAllHospitals = asyncHandler(async (req, res) => {
	const hospitals = await Hospital.find({}).select("-__").sort("name");
	res.status(StatusCodes.OK).json({ count: hospitals.length, hospitals });
});

/**
 * @desc	Updates a hospital
 * @route	PUT /api/v1/country/:hospitalId
 * @access	Super Admin
 */
const updateHospitalById = asyncHandler(async (req, res) => {
	const { hospitalId } = req.params;
	const { name, description, location, users, staff, services, hazards } =
		req.body;

	const hospital = await Hospital.findById(hospitalId);

	if (!hospital) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`Hospital with ID ${hospitalId} not found.`);
	}

	if (name && name !== hospital.name) {
		// Check to see if this name already exists for another hospital due to unique field
		const isExist = await Hospital.findOne({ name });
		if (isExist) {
			res.status(StatusCodes.CONFLICT);
			throw new Error(
				`A hospital with the name '${name}' already exists.`
			);
		}
		// If check passes, change the name of the hospital
		hospital.name = name;
	}
	if (description && description !== hospital.description) {
		hospital.description = description;
	}
	if (location && location !== hospital.location) {
		hospital.location = location;
	}
	if (users && users !== hospital.users) {
		hospital.users = users;
	}
	if (staff && staff !== hospital.staff) {
		hospital.staff = staff;
	}
	if (services && services !== hospital.services) {
		hospital.services = services;
	}
	if (hazards && hazards !== hospital.hazards) {
		hospital.hazards = hazards;
	}
	// Save the document after all changes have been completed
	await hospital.save();

	res.status(StatusCodes.OK).json({ hospital });
});

/**
 * @desc	Deletes a hospital
 * @route	DELETE /api/v1/hospital/:hospitalId
 * @access	Super Admin
 */

const deleteHospitalById = asyncHandler(async (req, res) => {
	const { hospitalId } = req.params;

	const hospital = await Hospital.findById(hospitalId);
	if (!hospital) {
		res.statuses.status(StatusCodes.NOT_FOUND);
		throw new Error(
			`Hospital with ID ${hospitalId} not found in hospital records`
		);
	}
	// delete everywhere where hospital is referenced( look at deleteHospitalById in hospitalController.JS)

	await hospital.deleteOne();

	res.status(StatusCodes.OK).json({
		msg: `${hospital.name} with ID ${hospitalId} successfully deleted.`,
	});
});

module.exports = {
	createHospital,
	getAllHospitals,
	updateHospitalById,
	deleteHospitalById,
};
