const mongoose = require("mongoose");

const EnumSchema = new mongoose.Schema(
	{
		category: {
			type: String,
			required: true,
			unique: true,
		},
		names: [
			{
				name: {
					type: String,
					required: true,
					trim: true,
				},
				parent: {
					type: String,
					default: null,
					trim: true,
				},
				_id: false,
			},
		],
		createdBy: {
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				required: true,
			},
			comments: {
				type: String,
			},
		},
		updatedBy: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
				},
				date: {
					type: Date,
				},
				comments: {
					type: String,
				},
				_id: false,
			},
		],
	},
	{ timestamps: true }
);

EnumSchema.path("names").validate(function (names) {
	const hasNullParent = names.some((n) => n.parent === null);
	const hasNonNullParent = names.some((n) => n.parent !== null);

	if (hasNullParent && hasNonNullParent) {
		return false;
	}
	return true;
}, "If 'parent' is not null, it must not be empty or undefined.");

EnumSchema.path("names").validate(function (names) {
	const seen = new Set();

	for (const { name, parent } of names) {
		const key = `${name}:${parent || "null"}`;
		if (seen.has(key)) {
			return false; // Duplicate found
		}
		seen.add(key);
	}

	return true;
}, "Duplicate 'name' with the same 'parent' is not allowed within the same category.");

const Enum = mongoose.model("Enum", EnumSchema);

module.exports = {
	Enum,
};
