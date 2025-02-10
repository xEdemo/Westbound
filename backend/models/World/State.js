const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// State Schema
const StateSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      population: {
        type: Number,
        min: 0,
        max: 1000,
      },
      banks: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Bank",
        },
      ],
      country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Country",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

const State = mongoose.model("State", StateSchema);
  // Export Models
module.exports = {
    State,
  };
  