const { Plane } = require("../models/planes");
const { Landing } = require("../models/landings");


exports.getAllLandings = async () => {
  try {
    return await Landing.find();
  } catch (error) {
    console.log(error);
  }
};

exports.getLandingByPlaneId = async (planeId) => {
  try {
    const plane = await Plane.findById(planeId).select("_id name position");
    if (!plane) {
      console.log(`plane not found`);
    }

    const resLanding = await Landing.find({ landingPlane: plane });
    if (!resLanding) console.log("landing with the spacific plane not found");

    return resLanding[0];
  } catch (error) {
    console.log(error);
  }
};

exports.addLanding = async (planeId, landingRightNow) => {
  try {
    const plane = await Plane.findById(planeId).select("_id name position");
    if (!plane) {
      console.log(`plane not found`);
    }

    const newLanding = new Landing({
      landingPlane: plane,
      rightNow: landingRightNow,
    });

    const savedLanding = await newLanding.save();
    if (!savedLanding) console.log("cant create the Landing");
    return newLanding;
  } catch (error) {
    console.log(error);
  }
};

exports.updateLanding = async (landingId, landingRightNow) => {
  try {
    const resLanding = await Landing.findByIdAndUpdate(
      landingId,
      {
        rightNow: landingRightNow,
      },
      { new: true }
    );

    if (!resLanding) console.log("Landing with the spacific ID not found");

    return resLanding;
  } catch (error) {
    console.log(error);
  }
};
