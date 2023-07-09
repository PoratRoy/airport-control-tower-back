const { Plane } = require("../models/planes");
const { Strip } = require("../models/strips");


exports.getAllStrips = async () => {
  try {
    return await Strip.find();
  } catch (error) {
    console.log(error);
  }
};

exports.getStripByNumber = async (number) => {
  try {
    const resStrip = await Strip.find({ number: number });
    if (!resStrip) console.log("strip with the spacific number not found");

    return resStrip[0];
  } catch (error) {
    console.log(error);
  }
};

exports.updateStrip = async (stripId, planeId, open) => {
  try {
    
    let plane = null;
    if(planeId){
      plane = await Plane.findById(planeId);
      if (!plane) {
        console.log(`plane not found`);
      }
    }
    
    const resStrip = await Strip.findByIdAndUpdate(
      stripId,
      {
        open: open,
        plane: plane,
      },
      { new: true }
    );

    if (!resStrip) console.log("strip with the spacific ID not found");

    return resStrip;
  } catch (error) {
    console.log(error);
  }
};
