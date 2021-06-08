const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  { autoIndex: true }
);

const Device = mongoose.model("devices", deviceSchema);

module.exports = Device;
