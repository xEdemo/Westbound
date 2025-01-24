const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { Property } = require("../models");

/**
 * @desc	Creates a property
 * @route	POST /api/v1/property
 * @access	Super Admin
 */

const createProperty = asyncHandler(async (req, res) => {
    const {name, type, description, location, isAvailableForSale, owner, history, } = req.body;
    if (!name || !type || !description) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error(`Please fill out all required fields.`);
    }
    const property = await Property.create({
        name,
        type,
        description,
        location,
        isAvailableForSale,
        owner,
        history,
    });
    res.status(StatusCodes.OK).json({ property });
});

/**
 * @desc	Get all properties
 * @route	Get /api/v1/property
 * @access	Private
 */
const getAllProperties = asyncHandler(async(req, res) => {
    const properties = await Property.find({}).select("-__").sort("name");
    res.status(StatusCodes.OK).json({ count: properties.length, properties});
});

/**
 * @desc	Updates a property
 * @route	PUT /api/v1/country/:propertyId
 * @access	Super Admin
 */

const updatePropertyById = asyncHandler(async(req, res) => {
    const { propertyId } = req.params;
    const { name, type, description, location, isAvailableForSale, owner, history} = req.body;

    const property = await Property.findById(propertyId);

    if (!property) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error(`Property with ID ${propertyId} not found.`);
    }

    if (name && name !== property.name) {
        //check to see if this name already exists for another property due to unqiue field
        const isExist = await Property.findOne({ name });
        if (isExist) {
            res.status(StatusCodes.CONFLICT);
            throw new Error(
                `A Property with the name '${name}' already exists.`
            );
        }
        // if check passes, change the name of the property
        property.name = name;
    }
    if (type && type !== hospital.type) {
		property.type = type;
	}
    if (description && description !== property.description) {
		property.description = description;
	}
    if (isAvailableForSale && isAvailableForSale !== property.isAvailableForSale) {
		property.isAvailableForSale = isAvailableForSale;
	}
    if (owner && owner !== property.owner) {
		property.owner = owner
    }
    if (history && history !== property.history) {
		property.history = history
    }
    // save the document after all changes have been completed
    await property.save();

    res.status(StatusCodes.OK).json({ property });
});

/**
 * @desc	Deletes a property
 * @route	DELETE /api/v1/property/:propertyId
 * @access	Super Admin
 */

const deletePropertyById = asyncHandler(async( req, res) => {
    const { propertyId } = req.params;

    const property = await Property.findById(propertyId);
    if (!propertyId) {
        res.statuses.status(StatusCodes.NOT_FOUND);
        throw new Error(`Property with ID ${propertyId} not found in property records`)
    }
    // delete everywhere where property is referenced

    await property.deleteOne();

    res.status(StatuscOdes.OK).json({
        msg: `${property.name} with ID ${propertyId} successfully deleted`
    });
});

module.exports = {
	createProperty,
	getAllProperties,
	updatePropertyById,
	deletePropertyById,
};