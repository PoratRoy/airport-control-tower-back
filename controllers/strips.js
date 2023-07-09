const { Strip } = require("../models/strips");
const { Plane } = require("../models/planes");
const ErrorResponse = require("../utils/errorResponse");

exports.getAllStrips = async (req, res, next) => {
  try{
    res.status(200).send(await Strip.find());
  } catch(error){
    next(error)
  }
};

exports.getStripById = async (req, res, next) => {
  try{
    const resStrip = await Strip.findById(req.params.id);
    if (!resStrip)
      return res.status(404).send("strip with the spacific ID not found");
  
    res.status(200).send(resStrip);
  }catch(error){
    next(error)
  }
};

exports.getStripByNumber = async (req, res, next) => {
  try{
    const resStrip = await Strip.find({number:req.body.number});
    if (!resStrip)
      return res.status(404).send("strip with the spacific number not found");
  
    res.status(200).send(resStrip);
  }catch(error){
    next(error)
  }
};


exports.addStrip = async (req, res, next) => {
  
  try {
    const plane = await Plane.findById(req.body.planeId);
    if(!plane){
      return res.status(404).send(`plane not found`);
    }

    const newStrip = new Strip({
        number: req.body.number,
        open: true,
        stripTimeMls: req.body.stripTimeMls,
        plane: plane
    });

    const savedStrip = await newStrip.save();
    if (!savedStrip) return res.status(500).send("cant create the strip");
    res.status(200).send(newStrip);
  } catch(error){
    next(error)
  }
};

exports.updateStrip = async (req, res, next) => {

  try{
    const plane = await Plane.findById(req.body.planeId);
    if(!plane){
      return res.status(404).send(`plane not found`);
    }

    const resStrip = await Strip.findByIdAndUpdate(
      req.params.id,
      {
        open: req.body.open,
        plane: plane
      },
      { new: true }
    );

    if (!resStrip)
      return res.status(404).send("strip with the spacific ID not found");
  
    res.status(200).send(resStrip);

  }catch(error){
    next(error)
  }
};


exports.deleteStrip = async (req, res, next) => {
  try{
    const resStrip = await Strip.findByIdAndRemove(req.params.id);
    if (!resStrip)
      return res.status(404).send("strip with the spacific ID not found");
  
    res.status(200).send(resStrip);
  }catch(error){
    next(error)
  }
};