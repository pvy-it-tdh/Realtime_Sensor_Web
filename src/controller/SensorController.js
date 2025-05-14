const Sensor = require("../model/Sensor");

let clients = [];

exports.postSensor = async (req, res) => {
  const { temperature, humidity } = req.body;

  if (typeof temperature !== "number" || typeof humidity !== "number") {
    return res.status(400).json({ error: "Sensor data must be a number" });
  }

  try {
    const newSensor = new Sensor({ temperature, humidity });
    await newSensor.save();

    const payloadData = newSensor.toObject();
    const payload = `data: ${JSON.stringify(payloadData)}\n\n`;

    // Gửi cho tất cả client đang còn hoạt động
    clients = clients.filter((client) => {
      try {
        client.write(payload);
        return true;
      } catch (err) {
        console.error("Client SSE write failed:", err.message);
        return false;
      }
    });

    res.status(201).json(newSensor);
  } catch (error) {
    console.error("Error saving sensor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.subscribeSensor = (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  clients.push(res);
  console.log("Client SSE connected. Total:", clients.length);

  // Gửi dữ liệu mới nhất ngay khi kết nối
  Sensor.findOne()
    .sort({ timestamp: -1 })
    .lean()
    .then((latest) => {
      if (latest) {
        res.write(`data: ${JSON.stringify(latest)}\n\n`);
      }
    });
  // Xử lý ngắt kết nối
  req.on("close", () => {
    clients = clients.filter((client) => client !== res);
    console.log("Client SSE disconnected. Total:", clients.length);
  });
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
    const latestSensor = await Sensor.findOne().sort({ timestamp: -1 });
    res.status(200).json(latestSensor);
  } catch (error) {
    console.error("Error fetching latest sensor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.renderHome = (req, res) => {
  try {
    res.render("index.ejs");
  } catch (error) {
    console.error("Error rendering:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
