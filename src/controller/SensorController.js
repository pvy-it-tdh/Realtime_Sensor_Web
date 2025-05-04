const Sensor = require("../model/Sensor");
exports.postSensor = async (req, res) => {
  const { temperature, humidity } = req.body;
  if (typeof temperature !== "number" || typeof humidity !== "number") {
    return res.status(400).json({ error: "Temperature must be a number" });
  }
  try {
    const newSensor = new Sensor({ temperature, humidity });
    await newSensor.save();
    res.status(201).json(newSensor);
  } catch (error) {
    console.error("Error saving sensor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.getSensor = async (req, res) => {
  try {
    const sensor = await Sensor.find().sort({ timestamp: -1 }).limit(10);
    res.status(200).json(sensor);
  } catch (error) {
    console.error("Error fetching sensor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.getTemperatureLatest = async (req, res) => {
  try {
    const latestSensor = await Sensor.findOne().sort({
      timestamp: -1,
    });
    res.status(200).json(latestSensor);
  } catch (error) {
    console.error("Error fetching latest sensor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
