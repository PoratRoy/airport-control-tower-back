const { Schedule } = require("../models/schedule");
const { Plane } = require("../models/planes");
const { Strip } = require("../models/strips");
const ErrorResponse = require("../utils/errorResponse");

exports.getAllSchedules = async (req, res, next) => {
  try{
    res.status(200).send(await Schedule.find());
  } catch(error){
    next(error)
  }
};

exports.getScheduleById = async (req, res, next) => {
  try{
    const resSchedule = await Schedule.findById(req.params.id);
    if (!resSchedule)
      return res.status(404).send("Schedule with the spacific ID not found");
  
    res.status(200).send(resSchedule);
  }catch(error){
    next(error)
  }
};


exports.addSchedule = async (req, res, next) => {
  
  try {
    const plane = await Plane.findById(req.body.planeId).select("_id name position");
    const strip = await Strip.findById(req.body.stripId).select("_id number");
    if(!plane || strip){
      return res.status(404).send(`plane not found`);
    }

    const newSchedule = new Schedule({
        plane: plane,
        strip: strip,
        enterTime: Date.now(),
    });

    const savedSchedule = await newSchedule.save();
    if (!savedSchedule) return res.status(500).send("cant create the Schedule");
    res.status(200).send(newSchedule);
  } catch(error){
    next(error)
  }
};

exports.updateSchedule = async (req, res, next) => {

  try{

    const resSchedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      {
        outTime: req.body.outTime,
      },
      { new: true }
    );

    if (!resSchedule)
      return res.status(404).send("Schedule with the spacific ID not found");
  
    res.status(200).send(resSchedule);

  }catch(error){
    next(error)
  }
};


exports.deleteSchedule = async (req, res, next) => {
  try{
    const resSchedule = await Schedule.findByIdAndRemove(req.params.id);
    if (!resSchedule)
      return res.status(404).send("Schedule with the spacific ID not found");
  
    res.status(200).send(resSchedule);
  }catch(error){
    next(error)
  }
};