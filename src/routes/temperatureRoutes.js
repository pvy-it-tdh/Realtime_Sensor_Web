const express = require("express");
const router = express.Router();
const SensorController = require("../controller/SensorController");

router.post("/sensor", SensorController.postSensor);
router.get("/sensors", SensorController.getSensor);
router.get("/sensor/latest", SensorController.getTemperatureLatest);
module.exports = router;
