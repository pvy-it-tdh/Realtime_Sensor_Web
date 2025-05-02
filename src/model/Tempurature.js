const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TempuratureSchema = new Schema({
  tepureature: Number,
  timestamp: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Tempurature", TempuratureSchema);
