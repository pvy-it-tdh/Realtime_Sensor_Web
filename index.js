const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;
const temperatureRoutes = require("./src/routes/temperatureRoutes");

mongoose
  .connect(
    "mongodb+srv://phucvy107:phucvyngocloan@cluster0.xg4b4qa.mongodb.net/esp32_sensor",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.get("/", (req, res) => {
  res.send("Hello from Node.js Server!");
});
app.use(bodyParser.json());
app.use("/api", temperatureRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
