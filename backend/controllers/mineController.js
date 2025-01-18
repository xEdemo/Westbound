const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { Mine } = require("../models");

/**
 * @desc	Creates a Mine
 * @route	POST /api/v1/Mine
 * @access	Super Admin
 */
const createMine = asyncHandler(async (req, res) => {
    const {name, typeOfMine, description, location, miningLevelRequirement, resources, currentYield, maxYield, hazards, depth, equipmentNeeded, events, npcInteraction} = req.body;
    if (!name, typeOfMine, description, location, miningLevelRequirement, resources, currentYield, maxYield, hazards, depth, equipmentNeeded, events, npcInteraction) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error(`Please fill out all required fields.`);
    }
    const mine = await Mine.create({
        name,
        typeOfMine,
        description,
        location,
        miningLevelRequirement,
        resources,
        currentYield,
        maxYield,
        hazards,
        depth,
        equipmentNeeded,
        events,
        npcInteraction,
    });
    res.status(StatusCodes.OK).json({ mine });
 });

 /**
 * @desc	Get all mines
 * @route	Get /api/v1/mine
 * @access	Private
 */

 const getAllMines = asyncHandler(async (req, res)=> {
    const mines = await Mine.find({}).select("-__v").sort("name");
    res.status(StatusCodes.OK).json({ count: mines.length, mines });
 });

 /**
 * @desc	Updates a mine
 * @route	PUT /api/v1/mine/:mineId
 * @access	Super Admin
 */

 const updateMineById = asyncHandler(async (req, res) => {
    const { mineId } = req.params;
    const { name, typeOfMine, description, location, miningLevelRequirement, resources, currentYield, maxYield, hazards, depth, equipmentNeeded, events, npcInteraction } = req.body;

    const mine = await Mine.findById(mineId);

    if (!mine) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error(`Mine with ID ${mineID} not found.`);
    }

    if (name && name !== mine.name) {
        // check to see if this name already exists for another mine due to unique field
        const isExist = await Mine.findOne({ name });
        if (isExist) {
            res.status(StatusCodes.CONFLICT);
            throw new Error(
                `A mine with the name '${mine}' already exists.`
            );
        }
        // if check passes, change the name of the mine
        mine.name = name;
    }
    if (description && description !== mine.description) {
        mine.description = description;
    }
    if (typeOfMine && typeOfMine !== mine.typeOfMine) {
        mine.typeOfMine = typeOfMine;
    }
    if (location && location !== mine.location) {
        mine.location = location;
    }
    if (miningLevelRequirement && miningLevelRequirement !== mine.miningLevelRequirement) {
        mine.miningLevelRequirement = miningLevelRequirement;
    }
    if (resources && resources !== mine.resources) {
        mine.resources = resources;
    }
    if (currentYield && currentYield !== mine.currentYield) {
        mine.currentYield = currentYield;
    }
    if (maxYield && maxYield !== mine.maxYield) {
        mine.maxYield = maxYield;
    }
    if (hazards && hazards !== mine.hazards) {
        mine.hazards = hazards;
    }
    if (depth && depth !== mine.depth) {
        mine.depth = depth;
    }
    if (equipmentNeeded && equipmentNeeded !== mine.equipmentNeeded) {
        mine.equipmentNeeded = equipmentNeeded;
    }
    if (events && events !== mine.events) {
        mine.events = events;
    }
    if (npcInteraction && npcInteraction !== mine.npcInteraction) {
        mine.npcInteraction = npcInteraction;
    }
    // save the document after all changes have been completed
    await mine.save();

    res.status(StatusCodes.OK).json({ mine });


});

/**
 * @desc	Deletes a mine
 * @route	DELETE /api/v1/mine/:mineId
 * @access	Super Admin
 */

const deleteMineById = asyncHandler(async (req, res) => {
    const { mineId } = req.params;

    const mine = await Mine.findById(mineId);
    if (!mine) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error(
            `Mine with Id ${mineId} not found in mine records.)`
        );
    }
    // delete everywhere where mine is referenced (look at deleteMineById in mineControllerJS)

    await mine.deleteOne();

    res.status(StatusCodes.OK).json({
        msg: `${mine.name} with ID ${mineId} successfully deleted.`
    });
});

module.exports = {
	createMine,
	getAllMines,
	updateMineById,
	deleteMineById,
};