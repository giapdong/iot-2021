const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const Device = require("./models/Device");

require("dotenv").config();

// Connect to mongo atlas
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to mongo atlas!");
  });

// initialize server
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.get("/test", (req, res) => {
  res.send("Hello, test api!");
});

app.get("/devices", async (req, res) => {
  const devices = await Device.find();
  res.json(devices);
});

app.post("/devices", async (req, res) => {
  const device = await Device.create(req.body);
  res.json(device);
});

app.get("/device/:id", async (req, res) => {
  const device = await Device.findOne({ id: req.params.id }).exec();
  res.json(device);
});

app.put("/device/:id", async (req, res) => {
  const device = await Device.findOne({ id: req.params.id }).exec();
  device.type = req.body.type;
  device.name = req.body.name;
  await device.save();
  res.json(device);
});

app.delete("/device/:id", async (req, res) => {
  const device = await Device.deleteOne({ id: req.params.id }).exec();
  res.json(device);
});

app.listen(process.env.PORT, () => {
  console.log("API running at port: ", process.env.PORT);
});
