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

/**
 * Find all devices in database
 */
app.get("/devices", async (req, res) => {
  try {
    const devices = await Device.find();
    res.json(devices);
  } catch (error) {
    res.status(404).send(error);
  }
});

/**
 * Create new device with unique id value
 */
app.post("/devices", async (req, res) => {
  try {
    const existDevice = await Device.findOne({ id: req.body.id }).exec();
    if (existDevice) return res.status(400).send("Exist device");

    const device = await Device.create(req.body);
    res.json(device);
  } catch (error) {
    res.status(404).send(error);
  }
});

/**
 * Get info device match with id value
 */
app.get("/device/:id", async (req, res) => {
  try {
    const device = await Device.findOne({ id: req.params.id }).exec();
    res.json(device);
  } catch (error) {
    res.json({ message: "Not found device" });
  }
});

/**
 * Update device infomation
 */
app.put("/device/:id", async (req, res) => {
  try {
    const device = await Device.findOne({ id: req.params.id }).exec();
    device.type = req.body.type;
    device.name = req.body.name;
    await device.save();
    res.json(device);
  } catch (error) {
    res.status(400).send("Something went wrong!");
  }
});

/**
 * Delete device
 */
app.delete("/device/:id", async (req, res) => {
  try {
    const device = await Device.deleteOne({ id: req.params.id }).exec();
    res.json(device);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(process.env.PORT, () => {
  console.log("API running at port: ", process.env.PORT);
});
