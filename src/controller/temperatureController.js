const Tempurature = require("../model/Temperature");
exports.postTemperature = async (req, res) => {
  const { temperature } = req.body;
  if (typeof temperature !== "number") {
    return res.status(400).json({ error: "Temperature must be a number" });
  }
  try {
    const newTemperature = new Tempurature({ temperature });
    await newTemperature.save();
    res.status(201).json(newTemperature);
  } catch (error) {
    console.error("Error saving temperature:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
