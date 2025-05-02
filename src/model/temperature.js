const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TemperatureSchema = new Schema({
  temperature: Number,
  timestamp: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Tempurature", TemperatureSchema);
