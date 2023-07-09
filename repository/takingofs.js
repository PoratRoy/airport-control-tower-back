const { Plane } = require("../models/planes");
const { Takingof } = require("../models/takeingofs");



exports.getAllTakingofs = async () => {
  try {
    return await Takingof.find();
  } catch (error) {
    console.log(error);
  }
};

exports.getTakingofByPlaneId = async (planeId) => {
  try {
    const plane = await Plane.findById(planeId).select("_id name position");
    if (!plane) {
      console.log(`plane not found`);
    }

    const resTakingof = await Takingof.find({ takingofPlane: plane });
    if (!resTakingof) console.log("takeof with the spacific plane not found");

    return resTakingof[0];
  } catch (error) {
    console.log(error);
  }
};

exports.addTakingof = async (planeId, takingofRightNow) => {
  try {
    const plane = await Plane.findById(planeId).select("_id name position");
    if (!plane) {
      console.log(`plane not found`);
    }

    const newTakingof = new Takingof({
      takingofPlane: plane,
      rightNow: takingofRightNow,
    });

    const savedTakingof = await newTakingof.save();
    if (!savedTakingof) console.log("cant create the Takingof");
    return newTakingof;
  } catch (error) {
    console.log(error);
  }
};

exports.updateTakingof = async (takingofId, takingofRightNow) => {
  try {
    const resTakingof = await Takingof.findByIdAndUpdate(
      takingofId,
      {
        rightNow: takingofRightNow,
      },
      { new: true }
    );

    if (!resTakingof) console.log("Takingof with the spacific ID not found");

    return resTakingof;
  } catch (error) {
    console.log(error);
  }
};
