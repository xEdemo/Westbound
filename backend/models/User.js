const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const {
	calculateUserLevel,
	calculateCrimeLevel,
} = require("../utils/xpFormula.js");

const maxUserXp = 170356920647;
const maxUserLevel = 200;
const maxCrimeXp = 995000;
const maxCrimeLevel = 200;

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, "Please provide your desired username"],
			minlength: 2,
			maxlength: 20,
			match: [
				/^[A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)*$/,
				`Username can only contain letters, numbers, dashes (-), and underscores (_) with no consecutive or ending symbols.`,
			],
			unique: true,
		},
		email: {
			type: String,
			required: [true, `Please provide a unique email address.`],
			unique: true,
			validate: {
				validator: validator.isEmail,
				message: "Please provide a valid email address",
			},
			minlength: 5,
			maxlength: 254,
		},
		password: {
			type: String,
			required: [true, "Please provide a password."],
			minlength: 8,
			maxlength: 60,
		},
		role: {
			type: String,
			enum: ["user", "admin", "superAdmin"],
			default: "user",
		},
		bloodType: {
			type: String,
			enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], // Valid blood types
			required: true,
		},
		progression: {
			level: {
				type: Number,
				min: 1,
				max: maxUserLevel,
				default: 1,
			},
			xp: {
				type: Number,
				default: 250,
				max: maxUserXp,
			},
		},
		bars: {
			health: {
				softCap: {
					type: Number,
					default: 100,
				},
				current: {
					type: Number,
					default: 100,
				},
			},
			stamina: {
				softCap: {
					type: Number,
					default: 100,
				},
				current: {
					type: Number,
					default: 100,
				},
			},
			focus: {
				softCap: {
					type: Number,
					default: 30,
				},
				current: {
					type: Number,
					default: 30,
				},
			},
			reputation: {
				type: Number,
			},
		},
		crime: [
			{
				id: {
					type: mongoose.Schema.Types.ObjectId,
				},
				name: {
					type: String,
				},
				level: {
					type: Number,
					max: maxCrimeLevel,
					min: 1,
				},
				xp: {
					type: Number,
					max: maxCrimeXp,
					min: 0,
				},
				_id: false,
			},
		],
	},
	{
		timestamps: true,
	}
);

UserSchema.pre("save", async function (next) {
	if (!this.isModified("password") || this.isPasswordHashed) {
		return next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	this.isPasswordHashed = true;
	next();
});

// Convert username to lowercase before saving
UserSchema.pre("save", function (next) {
	this.username = this.username.toLowerCase();
	next();
});

UserSchema.methods.updateUserLevel = async function () {
	if (this.progression.xp > maxUserXp) {
		this.progression.xp = maxUserXp;
	}

	const oldLevel = this.progression.level;
	const newLevel = calculateUserLevel(
		this.progression.xp,
		this.progression.level
	);
	const finalLevel = Math.min(newLevel, maxUserLevel);

	const levelsGained = finalLevel - oldLevel;

	if (levelsGained > 0) {
		this.bars.focus.softCap += 2 * levelsGained;
		this.bars.stamina.softCap += 5 * levelsGained;
		this.bars.health.softCap += 100 * levelsGained;
		// Refill bars on level
		this.bars.focus.current = this.bars.focus.softCap;
		this.bars.stamina.current = this.bars.stamina.softCap;
		this.bars.health.current = this.bars.health.softCap;
	}

	this.progression.level = finalLevel;

	// Save the user
	await this.save();
};

UserSchema.methods.updateCrimeLevel = async function (crimeId) {
	// Find the specific crime in the user's crime array
	const crime = this.crime.find(
		(c) => c.id.toString() === crimeId.toString()
	);

	if (!crime) {
		throw new Error(`Crime with ID ${crimeId} not found.`);
	}

	if (crime.xp > maxCrimeXp) {
		crime.xp = maxCrimeXp;
	}

	// Calculate the new level using the current level
	const newLevel = calculateCrimeLevel(crime.xp, crime.level);
	const finalLevel = Math.min(newLevel, maxCrimeLevel);

	const levelsGained = finalLevel - crime.level;

	if (levelsGained > 0) {
		// Adjust crime level
		crime.level = finalLevel;

		// Add bonuses for leveling up a crime
	}

	await this.save();
};

UserSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
