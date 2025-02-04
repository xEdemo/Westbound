const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { BlackMarket } = require("../models");

/**
 * @desc	Creates a blackMarket
 * @route	POST /api/v1/blackMarket
 * @access	Super Admin
 */
const createBlackMarket = asyncHandler(async (req, res) => {
    const {name, description, location,inventory, taxRate, heatLevel, reputationRequiredToEnter, accessTiers, loanSharks, secretCodeForEntry } =
        req.body;
    if (!name) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error('Please fill out all required fields.');
    }
    const blackMarket = await BlackMarket.create({
        name,
        description,
        location,
        inventory,
        taxRate,
        heatLevel,
        reputationRequiredToEnter,
        accessTiers,
        loanSharks,
        secretCodeForEntry,

    });
    res.status(StatusCodes.OK).json({ blackMarket});
});

/**
 * @desc	Get all blackMarkets
 * @route	Get /api/v1/blackMarket
 * @access	Private
 */
const getAllBlackMarkets = asyncHandler(async(req,res) => {
    const blackMarkets = await BlackMarket.find({}).select("-__").sort("name");
    res.status(StatusCodes.OK).json({ count: blackMarkets.length, blackMarkets});
});

/**
 * @desc	Updates a blackMarket
 * @route	PUT /api/v1/country/:blackMarketId
 * @access	Super Admin
 */
const updateBlackMarketById = asyncHandler(async(req,res) => {
    const { blackMarketId} = req.params;
    const { name, description, location, inventory, taxRate, heatLevel, reputationRequiredToEnter, accessTiers, loanSharks, secretCodeForEntry,} =
        req.body;
    
    const blackMarket = await BlackMarket.findById(blackMarketId);

    if (!blackMarket) {
        res.status(StatusCodes.BAD_REQUEST);
        throw MongoNetworkError(`BlackMarket with ID ${blackMarketId} not found`);
    }

    if (name && name !== blackMarket.name) {
        //check to see if this name already exists for another blackMarket due to unique field
        const isExist = await BlackMarket.findOne({ name });
        if (isExist) {
            res.status(StatusCodes.CONFLICT);
            throw new Error(
                `A blackMarket with the name '${name}' already exists.`
            );
        }
        // if check passes, change the name of the blackMarket
        blackMarket.name = name;
    }
    if (description && description !== blackMarket.description) {
        blackMarket.description = description;
    }
    if (location && location !== blackMarket.location) {
        blackMarket.location = location;
    }
    if (inventory && inventory !== blackMarket.inventory) {
        blackMarket.inventory = inventory;
    }
    if (taxRate && taxRate !== blackMarket.taxRate) {
        blackMarket.taxRate = taxRate;
    }
    if (heatLevel && heatLevel !== blackMarket.heatLevel) {
        blackMarket.heatLevel = heatLevel;
    }
    if (reputationRequiredToEnter && reputationRequiredToEnter !== blackMarket.reputationRequiredToEnter) {
        blackMarket.reputationRequiredToEnter = reputationRequiredToEnter;
    }
    if (accessTiers && accessTiers !== blackMarket.accessTiers) {
        blackMarket.accessTiers = accessTiers;
    }
    if ( loanSharks && loanSharks !== blackMarket.loanSharks) {
        blackMarket.loanSharks = loanSharks;
    }
    if (secretCodeForEntry && secretCodeForEntry !== blackMarket.secretCodeForEntry) {
        blackMarket.secretCodeForEntry = secretCodeForEntry;
    }
    // save the document after all changes have been completed
    await blackMarket.save();
});

/**
 * @desc	Deletes a blackMarket
 * @route	DELETE /api/v1/blackMarket/:blackMarketId
 * @access	Super Admin
 */

const deleteBlackMarketById = asyncHandler(async(req,res) => {
    const {blackMarketId} = req.params;

    const blackMarket = await BlackMarket.findById(blackMarketId);
    if (!blackMarket) {
        res.statusMessage.status(StatusCodes.NOT_FOUND);
        throw new Error(` Hospital with ID ${blackMarketId} not found in blackMarket records`);
    }
    // delete everywhere where blackMarket is referenced(look at deleteBlackMarketById in blackMarketController)

    await blackMarket.deleteOne();

    res.status(StatusCodes.OK).json({
        msg: `${blackMarket.name} with id ${blackMarketId} successfully deleted.`,
    });

});

module.exports = {
	createBlackMarket,
	getAllBlackMarkets,
	updateBlackMarketById,
	deleteBlackMarketById,
};
