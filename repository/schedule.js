const { Plane } = require("../models/planes");
const { Strip } = require("../models/strips");
const { Schedule } = require("../models/schedule");



exports.getAllSchedules = async () => {
  try {
    return await Schedule.find();
  } catch (error) {
    console.log(error);
  }
};

exports.getScheduleByStripIdAndPlaneId = async (stripId, planeId) => {
  try {
    const strip = await Strip.findById(stripId).select("_id number");
    const plane = await Plane.findById(planeId).select("_id name position");
    if (!strip || !plane) {
      console.log(`strip not found`);
    }

    const resSchedule = await Schedule.find({ $and: [{strip: strip}, {plane: plane}] });
    if (!resSchedule) console.log("Schedule with the spacific strip or plane not found");

    return resSchedule[0];
  } catch (error) {
    console.log(error);
  }
};

exports.addSchedule = async (planeId, stripId) => {
  try {
    const plane = await Plane.findById(planeId).select("_id name position");
    const strip = await Strip.findById(stripId).select("_id number");
    if (!plane) {
      console.log(`plane or strip not found`);
    } //places where strip is null its wont work

    //new Date().toLocaleTimeString()
    const newSchedule = new Schedule({
      plane: plane,
      strip:strip,
      enterTime: new Date()
    });

    const savedSchedule = await newSchedule.save();
    if (!savedSchedule) console.log("cant create the Schedule");
    return newSchedule;
  } catch (error) {
    console.log(error);
  }
};

exports.updateSchedule = async (scheduleId) => {
  try {
    const resSchedule = await Schedule.findByIdAndUpdate(
      scheduleId,
      {
        outTime: new Date()
      },
      { new: true }
    );

    if (!resSchedule) console.log("Schedule with the spacific ID not found");

    return resSchedule;
  } catch (error) {
    console.log(error);
  }
};


