require("dotenv").config();
const mongoose = require("mongoose");

const landingSchema = new mongoose.Schema(
  {
    landingPlane: {
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

const Landing = mongoose.model("Landing", landingSchema);

module.exports.Landing = Landing;
module.exports.landingSchema = landingSchema;
