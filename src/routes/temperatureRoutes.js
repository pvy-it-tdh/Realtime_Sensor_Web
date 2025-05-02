const express = require("express");
const router = express.Router();
const TemperatureController = require("../controller/temperatureController");

router.post("/temperature", TemperatureController.postTemperature);
module.exports = router;
