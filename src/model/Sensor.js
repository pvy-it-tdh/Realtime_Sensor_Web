const mongoose = require("mongoose");

const SensorSchema = new mongoose.Schema(
  {
    temperature: Number,
    humidity: Number,
  },
  { timestamps: true } // <-- Gợi ý nên thêm dòng này
);

module.exports = mongoose.model("Sensor", SensorSchema);
