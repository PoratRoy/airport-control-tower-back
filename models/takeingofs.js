require("dotenv").config();
const mongoose = require("mongoose");

const takingofSchema = new mongoose.Schema(
  {
    takingofPlane: {
      type: new mongoose.Schema({
        name: {
          type: String,
        },
        position: {
          type: Number,
        },
      }),
    },
    rightNow:{
        type:Boolean,
        default:false,
    }
  },
  { timestamps: true }
);

const Takingof = mongoose.model("Takingof", takingofSchema);

module.exports.Takingof = Takingof;
module.exports.takingofSchema = takingofSchema;