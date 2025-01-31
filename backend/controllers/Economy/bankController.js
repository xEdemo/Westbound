const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { Bank } = require("../../models");

/**
 * @desc	Creates a bank
 * @route	POST /api/v1/bank
 * @access	Super Admin
 */

const createBank = asyncHandler(async (req, res) => {
	const { name, description, location, owner, reputation, isBlackMarket } =
		req.body;
	if (!name) {
		res.status(StatusCodes.BAD_GATEWAY.REQUEST);
		throw new error("Please fill out all required fields");
	}
	const bank = await Bank.create({
		name,
		description,
		location,
		owner,
		reputation,
		isBlackMarket,
	});
	res.status(StatusCodes.OK).json({ bank });
});

/**
 * @desc	Get all banks
 * @route	Get /api/v1/bank
 * @access	Private
 */
const getAllBanks = asyncHandler(async (req, res)=> {
    const banks = await Bank.find({}).select("-__v").sort("name");
    res.status(StatusCodes.OK).json({ count: banks.length, banks });
});

/**
 * @desc	Updates a bank
 * @route	PUT /api/v1/bank/:bankId
 * @access	Super Admin
 */

const updateBankById = asyncHandler(async (req, res) => {
    const { bankId } = req.params;
    const { name, description, location, owner, reputation, isBlackMarket } = req.body;

    const bank = await Bank.findById(bankId);

    if (!bank) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error(`Bank with ID ${countrId} not found.`);
    }

    if (name && name !== bank.name) {
        // check to see if this name already exists for another bank due to unqiue field
        const isExist = await Bank.findOne({ name });
        if (isExist) {
            res.status(StatusCodes.CONFLICT);
            throw new Error(
                `A country with the name '${name} already exists.`
            );
        }
        // if check passes, change the name of the bank
        bank.name = name;
    }
    if (description && description !== bank.description) {
        bank.description = description;
    }
    // Save the document after all changes have been completed
    await bank.save();

    res.status(StatusCodes.OK).json({ bank });
});

/**
 * @desc	Deletes a bank
 * @route	DELETE /api/v1/bank/:bankId
 * @access	Super Admin
 */

const deleteBankById = asyncHandler(async (req, res) => {
    const { bankId } = req.params;

    const bank = await Bank.findById(bankId);
    if (!bank) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error(
            `Country with ID ${bankId} not found in bank records.`
        );
    }
    // Delete everywhere where bank is referenced ((look at deleteBankById in bankController.js))

    await bank.deleteOne();

    res.status(StatusCodes.OK).json({
        msg: `${bank.name} with ID ${bankId} successfully deleted.`,
    });
});


module.exports = {
	createBank,
    getAllBanks,
    updateBankById,
    deleteBankById,
};
