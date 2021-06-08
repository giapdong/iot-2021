const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    type: {
      type: String,
    },
    id: {
      type: String,
    },
  },
  { autoIndex: false }
);

const Device = mongoose.model("devices", deviceSchema);

module.exports = Device;
