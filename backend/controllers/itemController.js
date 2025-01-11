const { StatusCodes } = require("http-status-codes");
const { Item } = require("../models");
const asyncHandler = require("express-async-handler");

/**
 * @desc	Create an item
 * @route	POST /api/v1/item
 * @access	Super Admin
 */
const createItem = asyncHandler(async (req, res) => {
	res.status(StatusCodes.OK).json({ msg: "works" })
});

module.exports = {
	createItem,
}