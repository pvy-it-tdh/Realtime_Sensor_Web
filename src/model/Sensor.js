const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SensorSchema = new Schema({
  temperature: Number,
  humidity: Number,
  timestamp: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Sensor", SensorSchema);
