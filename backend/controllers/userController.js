const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { User } = require("../models");
const { createJWT } = require("../config/createJWT.js");

/**
 * @desc	Sign Up a new user
 * @route	POST /api/v1/user
 * @access	Public
 */
const registerUser = asyncHandler(async (req, res) => {
	const { username, email, password } = req.body;
	const userEmailExists = await User.findOne({ email });
	const userUsernameExists = await User.findOne({ username });

	if (userEmailExists) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`User with the email ${email} already exists.`);
	}
	if (userUsernameExists) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`The username ${username} is already taken.`);
	}

	const user = await User.create({ username, email, password });

	if (user) {
		res.status(StatusCodes.CREATED).json({
			_id: user._id,
			username: user.username,
			email: user.email,
		});
	} else {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`Invalid user data.`);
	}
});

/**
 * @desc	Get user info
 * @route	Get /api/v1/user
 * @access	Private
 */
const getUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id).select("-__v -password");

	if (!user) {
		res.status(StatusCodes.NOT_FOUND);
		throw new Error("User not found");
	}

	res.status(StatusCodes.OK).json({ user });
});

/**
 * @desc	Auth user/set token
 * @route	POST /api/v1/user/auth
 * @access	Public
 */
const authUser = asyncHandler(async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`Please enter a username and password.`);
	}

	const user = await User.findOne({ username });

	if (user && (await user.matchPassword(password))) {
		createJWT(res, user._id);

		res.status(StatusCodes.OK).json({ username: user.username });
	} else {
		res.status(StatusCodes.UNAUTHORIZED);
		throw new Error(`Invalid email or password.`);
	}
});

/**
 * @desc	Logout user
 * @route	POST /api/v1/user/logout
 * @access	Private
 */
const logoutUser = asyncHandler(async (req, res) => {
	const userId = req.user._id.toString();

	const user = await User.findById(userId);

	if (!user) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`No user found with id ${userId}.`);
	}

	res.cookie("jwt", "", {
		httpOnly: true,
		expires: new Date(0),
	});
	res.status(StatusCodes.OK).json({ username: user.username });
});

/**
 * @desc	Delete user and associated data
 * @route	DELETE /api/v1/user/:userId
 * @access	Private --- Super Admin
 */
const deleteUser = asyncHandler(async (req, res) => {
	const { userId } = req.params;

	const user = await User.findById(userId);

	if (!user) {
		res.status(StatusCodes.NOT_FOUND);
		throw new Error(`No user found with an id of ${userId}.`);
	}

	// Will need to delete their cookies

	await User.findByIdAndDelete(user._id);

	res.status(StatusCodes.OK).json({ msg: "User Deleted." });
});

module.exports = {
	registerUser,
	getUser,
	authUser,
	logoutUser,
	deleteUser,
};