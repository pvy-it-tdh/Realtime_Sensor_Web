const mongoose = require("mongoose");

const SensorSchema = new mongoose.Schema(
  {
    temperature: Number,
    humidity: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sensor", SensorSchema);
