require("dotenv").config();
const mongoose = require("mongoose");

const stripSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
    },
    open: {
      type: Boolean,
      default: true,
    },
    stripTimeMls: {
      type: Number,
      default: 2000
    },
    plane: {
      type: new mongoose.Schema({
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
      }),
    },
  },
  { timestamps: true }
);

const Strip = mongoose.model("Strip", stripSchema);

module.exports.Strip = Strip;
module.exports.stripSchema = stripSchema;
