const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WeatherSchema = new Schema(
  {
    location: {
      country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "World",
        required: true,
      },
      state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "World.states",
        required: true,
      },
      town: {
        type: String,
        required: true,
      },
    },
    temperature: {
      type: Number, // Temperature in Celsius or Fahrenheit
      required: true,
    },
    condition: {
      type: String,
      enum: [
        "Clear",
        "Partly Cloudy",
        "Cloudy",
        "Rain",
        "Thunderstorm",
        "Snow",
        "Fog",
        "Windy",
        "Heatwave",
        "Drought",
        "Sandstorm",
        "Blizzard",
      ],
      required: true,
    },
    windSpeed: {
      type: Number, // Measured in km/h or mph
      default: 0,
    },
    humidity: {
      type: Number, // Percentage (0-100)
      min: 0,
      max: 100,
      required: true,
    },
    precipitation: {
      type: Number, // Measured in mm or inches
      default: 0,
    },
    visibility: {
      type: Number, // Distance in km or miles
      default: 10,
    },
    season: {
      type: String,
      enum: ["Spring", "Summer", "Autumn", "Winter"],
      required: true,
    },
    disaster: {
      type: String,
      enum: [
        "None",
        "Flood",
        "Tornado",
        "Wildfire",
        "Earthquake",
        "Hurricane",
      ],
      default: "None",
    },
    forecast: [
      {
        date: {
          type: Date,
          required: true,
        },
        temperature: {
          type: Number,
          required: true,
        },
        condition: {
          type: String,
          enum: [
            "Clear",
            "Partly Cloudy",
            "Cloudy",
            "Rain",
            "Thunderstorm",
            "Snow",
            "Fog",
            "Windy",
            "Heatwave",
            "Drought",
            "Sandstorm",
            "Blizzard",
          ],
          required: true,
        },
      },
    ],
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

const Weather = mongoose.model("Weather", WeatherSchema);

module.exports = Weather;
