const express = require("express");
const router = express.Router();
const SensorController = require("../controller/SensorController");

router.post("/sensor", SensorController.postSensor);
router.get("/sensor", SensorController.getSensor);
router.get("/sensor/latest", SensorController.getTemperatureLatest);
router.get("/", SensorController.renderHome);
router.get("/events", SensorController.subscribeSensor);
module.exports = router;
