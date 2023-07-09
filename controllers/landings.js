const { Landing } = require("../models/landings");
const { Plane } = require("../models/planes");
const ErrorResponse = require("../utils/errorResponse");

exports.getAllLandings = async (req, res, next) => {
  try{
    res.status(200).send(await Landing.find());
  } catch(error){
    next(error)
  }
};

exports.getLandingById = async (req, res, next) => {
  try{
    const resLanding = await Landing.findById(req.params.id);
    if (!resLanding)
      return res.status(404).send("Landing with the spacific ID not found");
  
    res.status(200).send(resLanding);
  }catch(error){
    next(error)
  }
};


exports.addLanding = async (req, res, next) => {
  
  try {
    const plane = await Plane.findById(req.body.planeId).select("_id name position");
    if(!plane){
      return res.status(404).send(`plane not found`);
    }

    const newLanding = new Landing({
        landingPlane: plane,
        landingRightNow: false,
    });

    const savedLanding = await newLanding.save();
    if (!savedLanding) return res.status(500).send("cant create the Landing");
    res.status(200).send(newLanding);
  } catch(error){
    next(error)
  }
};

exports.updateLanding = async (req, res, next) => {

  try{

    const resLanding = await Landing.findByIdAndUpdate(
      req.params.id,
      {
        landingRightNow: req.body.landingRightNow,
      },
      { new: true }
    );

    if (!resLanding)
      return res.status(404).send("Landing with the spacific ID not found");
  
    res.status(200).send(resLanding);

  }catch(error){
    next(error)
  }
};


exports.deleteLanding = async (req, res, next) => {
  try{
    const resLanding = await Landing.findByIdAndRemove(req.params.id);
    if (!resLanding)
      return res.status(404).send("Landing with the spacific ID not found");
  
    res.status(200).send(resLanding);
  }catch(error){
    next(error)
  }
};