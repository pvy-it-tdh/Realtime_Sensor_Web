const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;

mongoose.connect(
  "mongodb+srv://phucvy107:phucvyngocloan@cluster0.xg4b4qa.mongodb.net/"
);

app.get("/", (req, res) => {
  res.send("Hello from Node.js Server!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
