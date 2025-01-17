const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { User, Crime } = require("../models");
const { createJWT } = require("../config/createJWT.js");
const { selectRandomBloodType } = require("../utils/bloodType.js");

/**
 * @desc	Sign Up a new user
 * @route	POST /api/v1/user
 * @access	Public
 */
const registerUser = asyncHandler(async (req, res) => {
	const { username, email, password } = req.body;

	const normalizedUsername = username.toLowerCase();
	const normalizedEmail = email.toLowerCase();

	const userEmailExists = await User.findOne({ email: normalizedEmail });
	const userUsernameExists = await User.findOne({
		username: normalizedUsername,
	});

	if (userEmailExists) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`User with the email ${email} already exists.`);
	}
	if (userUsernameExists) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`The username ${username} is already taken.`);
	}

	const allCrimes = await Crime.find({});

	const crime = allCrimes.map((c) => ({
		id: c._id,
		name: c.name,
		level: 1,
		xp: 0,
	}));

	const bloodType = selectRandomBloodType();

	const user = await User.create({
		username: normalizedUsername,
		email: normalizedEmail,
		password,
		crime,
		bloodType,
	});

	if (user) {
		res.status(StatusCodes.CREATED).json({
			_id: user._id,
			username: user.username,
			email: user.email,
			crime,
			bloodType,
		});
	} else {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`Invalid user data.`);
	}
});

/**
 * @desc	Get all usernames
 * @route	Get /api/v1/user/usernames
 * @access	Public
 */
const getAllUsernames = asyncHandler(async (req, res) => {
	const users = await User.find({}, "username");
	const usernames = users.map((user, index) => user.username);
	res.status(StatusCodes.OK).json({ usernames });
});

/**
 * @desc	Get all emails
 * @route	Get /api/v1/user/emails
 * @access	Public
 */
const getAllEmails = asyncHandler(async (req, res) => {
	const users = await User.find({}, "email");
	const emails = users.map((user, index) => user.email);
	res.status(StatusCodes.OK).json({ emails });
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

	const normalizedUsername = username.toLowerCase();

	if (!username || !password) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`Please enter a username and password.`);
	}

	const user = await User.findOne({ username: normalizedUsername });

	if (user && (await user.matchPassword(password))) {
		createJWT(res, user._id);

		res.status(StatusCodes.OK).json({ username: user.username });
	} else {
		res.status(StatusCodes.UNAUTHORIZED);
		throw new Error(`Invalid username or password.`);
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

/**
 * @desc	Testing API for user levels
 * @route	PUT /api/v1/user
 * @access	Private --- Super Admin
 */
const addXpToUser = asyncHandler(async (req, res) => {
	const userId = req.user._id.toString();

	const user = await User.findById(userId);

	if (!user) {
		res.status(StatusCodes.BAD_REQUEST);
		throw new Error(`No user found with id ${userId}.`);
	}

	//console.log(selectRandomBloodType())

	//const crime = user.crime.find((c) => c.id.toString() === "6786f21c9c10566e4d30d40a");
	//await user.updateCrimeLevel("6786f21c9c10566e4d30d40a");

	//user.progression.xp += 170356920646;
	//user.progression.xp += 10;
	//await user.updateUserLevel();
	res.status(StatusCodes.OK).json({ user });
});

module.exports = {
	registerUser,
	getAllUsernames,
	getAllEmails,
	getUser,
	authUser,
	logoutUser,
	deleteUser,
	addXpToUser,
};
