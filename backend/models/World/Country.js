const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Country Schema
const CountrySchema = new Schema(
	{
	  name: {
		type: String,
		unique: true,
		required: true,
	  },
	  description: {
		type: String,
	  },
	},
	{
	  timestamps: true,
	}
  );

const Country = mongoose.model("Country", CountrySchema);
  // Export Models
module.exports = {
    Country,
  };
  