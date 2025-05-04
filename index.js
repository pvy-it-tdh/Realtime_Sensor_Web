const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const SensorController = require("./src/controller/SensorController");
const path = require("path");
const app = express();
const PORT = 3000;
const SensorRoutes = require("./src/routes/temperatureRoutes");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "views");
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

app.get("/", SensorController.renderHome);
app.use(bodyParser.json());
app.use("/api", SensorRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
