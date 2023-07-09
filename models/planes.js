require("dotenv").config();
const mongoose = require("mongoose");

const planeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    position: {
      type: Number,
    },
    proper: {
      type: Boolean,
      default: true,
    }
  },
  { timestamps: true }
);


const Plane = mongoose.model("Plane", planeSchema);

module.exports.Plane = Plane;
module.exports.planeSchema = planeSchema;