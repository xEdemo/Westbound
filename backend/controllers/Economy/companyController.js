const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { Company } = require("../../models/Misc");

/**
 * @desc	Creates a company
 * @route	POST /api/v1/company
 * @access	Super Admin
 */

const createCompany = asyncHandler(async (req, res) => {
	const {
		name,
		description,
		isCompanyStockCompany,
		type,
		image,
		cost,
		fixedPositionsAvailable,
		rewards,
		ownerId,
		taxExempt,
		employees,
		finances,
		legalStatus,
		upgrades,
	} = req.body;
	if (!name) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`Please fill out all required fields.`);
	}
	const company = await Company.create({
		name,
		description,
		isCompanyStockCompany,
		type,
		image,
		cost,
		fixedPositionsAvailable,
		rewards,
		ownerId,
		taxExempt,
		employees,
		finances,
		legalStatus,
		upgrades,
	});
	res.status(StatusCodes.OK).json({ company });
});

/**
 * @desc	Get all companies
 * @route	Get /api/v1/company
 * @access	Private
 */

const getAllCompanies = asyncHandler(async (req, res) => {
	const companies = await Company.find({}).select("-__").sort("name");
	res.status(StatusCodes.OK).json({ count: companies.length, companies });
});

/**
 * @desc	Updates a company
 * @route	PUT /api/v1/country/:companyId
 * @access	Super Admin
 */

const updateCompanyById = asyncHandler(async (req, res) => {
	const { companyId } = req.params;
	const {
		name,
		description,
		isCompanyStockCompany,
		type,
		image,
		cost,
		fixedPositionsAvailable,
		rewards,
		ownerId,
		taxExempt,
		employees,
		finances,
		legalStatus,
		upgrades,
	} = req.body;

	const company = await Company.findById(companyId);

	if (!company) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`Company with ID ${companyId} not found.`);
	}

	if (name && name !== company.name) {
		// check to see if this name already exists for another company due to unqiue field
		const isExist = await Company.findOne({ name });
		if (isExist) {
			res.status(StatusCodes.CONFLICT);
			throw new Error(`A company with the name '${name} already exists.`);
		}
		// if check passes, change the name of the company
		company.name = name;
	}
	if (name && name !== hospital.name) {
		hospital.name = name;
	}
	if (description && description !== hospital.description) {
		hospital.description = description;
	}
	if (
		isCompanyStockCompany &&
		isCompanyStockCompany !== hospital.isCompanyStockCompany
	) {
		hospital.isCompanyStockCompany = isCompanyStockCompany;
	}
	if (type && type !== hospital.type) {
		hospital.type = type;
	}
	if (image && image !== hospital.image) {
		hospital.image = image;
	}
	if (cost && cost !== hospital.cost) {
		hospital.cost = cost;
	}
	if (
		fixedPositionsAvailable &&
		fixedPositionsAvailable !== hospital.fixedPositionsAvailable
	) {
		hospital.fixedPositionsAvailable = fixedPositionsAvailable;
	}
	if (rewards && rewards !== hospital.rewards) {
		hospital.rewards = rewards;
	}
	if (ownerId && ownerId !== hospital.ownerId) {
		hospital.ownerId = ownerId;
	}
	if (taxExempt && taxExempt !== hospital.taxExempt) {
		hospital.taxExempt = taxExempt;
	}
	if (employees && employees !== hospital.employees) {
		hospital.employees = employees;
	}
	if (finances && finances !== hospital.finances) {
		hospital.finances = finances;
	}
	if (legalStatus && legalStatus !== hospital.legalStatus) {
		hospital.legalStatus = legalStatus;
	}
	if (upgrades && upgrades !== hospital.upgrades) {
		hospital.upgrades = upgrades;
	}

	// save the documnent after all changes have been completed
	await company.save();

	res.status(StatusCodes.OK).json({ company });
});

/**
 * @desc	Deletes a company
 * @route	DELETE /api/v1/company/:companyId
 * @access	Super Admin
 */

const deleteCompanyById = asyncHandler(async (req, res) => {
	const { companyId } = req.params;

	const company = await Company.findById(companyId);
	if (!company) {
		res.statusMessage.status(StatusCodes.ACCEPTED.NOT_FOUND);
		throw new Error(
			`Company with Id ${companyId} not found in company records.`
		);
	}
	// delete everywhere where company is referenced

	await company.deleteOne();

	res.status(StatusCodes.OK).json({
		msg: `${company.name} with ID ${companyId} successfully deleted.`,
	});
});

module.exports = {
	createCompany,
	getAllCompanies,
	updateCompanyById,
	deleteCompanyById,
};
