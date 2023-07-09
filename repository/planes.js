const { Plane } = require("../models/planes");

exports.addPlane = async (position) => {
  try {
    const newPlane = new Plane({
      name: renderNewPlaneName(),
      position: position,
      proper: true,
    });

    const savedPlane = await newPlane.save();
    return savedPlane;
  } catch (error) {
    console.log(error);
  }
};

const renderNewPlaneName = () => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return `${alphabet[Math.floor(Math.random() * alphabet.length)]}${
    Math.floor(Math.random() * 30) + 1
  }`;
};

exports.updatePlane = async (planeId, position, proper) => {
  try {
    const resPlane = await Plane.findByIdAndUpdate(
        planeId,
      {
        position: position,
        proper: proper,
      },
      { new: true }
    );

    if (!resPlane)
      console.log("palne with the spacific ID not found");

    return resPlane;
  } catch (error) {
    console.log(error);
  }
};
