const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, "Please provide your desired username"],
			minlength: 2,
			maxlength: 20,
			match: [
				/^[A-Za-z0-9]+$/,
				`Please provide a valid username. Usernames must be atleast three characters, no longer than 20 characters, and must not contain any special characters`,
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
		crime: [{
			id: {
				type: mongoose.Schema.Types.ObjectId,
			},
			name: { 
				type: String,
			},
			level: {
				type: Number,
			},
			xp: {
				type: Number,
			},
			_id: false,
		}],
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

UserSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;