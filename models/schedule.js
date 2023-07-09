require("dotenv").config();
const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    plane: {
      type: new mongoose.Schema({
        name: {
          type: String,
        },
        position: {
          type: Number,
        },
      }),
    },
    strip: {
      type: new mongoose.Schema({
        number: {
          type: Number,
        },
      }),
    },
    enterTime: {
      type: Date,
    },
    outTime: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports.Schedule = Schedule;
module.exports.scheduleSchema = scheduleSchema;
