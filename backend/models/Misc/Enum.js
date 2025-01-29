const mongoose = require("mongoose");

const EnumCategorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			match: [/^[a-z][A-Za-z]*$/, `Name field must be camel cased.`],
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
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
				_id: false,
			},
		],
	},
	{ timestamps: true }
);

const EnumCategory = mongoose.model("EnumCategory", EnumCategorySchema);

const EnumSchema = new mongoose.Schema(
	{
		category: {
			type: String,
			required: true,
			validate: {
				validator: async function (value) {
					const exists = await EnumCategory.exists({
						name: value,
					});
					return exists;
				},
				message: (props) =>
					`${props.value} is not a valid category. Please use an existing category.`,
			},
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
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
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
	EnumCategory,
};
