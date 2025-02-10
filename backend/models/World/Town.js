const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Town Schema
const TownSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      enum: ["village", "ghost town", "city", "settlement"],
    },
    storefronts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Storefront",
      },
    ],
    transportation: {
      type: Schema.Types.Mixed, // Define structure as needed
    },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Town = mongoose.model("Town", TownSchema);

// Export Models
module.exports = {
    Town,
  };
  