const mongoose = require("mongoose");

const EnumCategorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			match: [
				/^[a-z][A-Za-z]*$/,
				`Name field must be camel cased.`
			]
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

// Compound index to ensure 'name' is unique within the same 'category'
EnumSchema.index({ category: 1, name: 1 }, { unique: true });

const Enum = mongoose.model("Enum", EnumSchema);

module.exports = {
	Enum,
	EnumCategory,
};
