const { Takingof } = require("../models/takeingofs");
const { Plane } = require("../models/planes");
const ErrorResponse = require("../utils/errorResponse");

exports.getAllTakingofs = async (req, res, next) => {
  try{
    res.status(200).send(await Takingof.find());
  } catch(error){
    next(error)
  }
};

exports.getTakingofById = async (req, res, next) => {
  try{
    const resTakingof = await Takingof.findById(req.params.id);
    if (!resTakingof)
      return res.status(404).send("Takingof with the spacific ID not found");
  
    res.status(200).send(resTakingof);
  }catch(error){
    next(error)
  }
};


exports.addTakingof = async (req, res, next) => {
  
  try {
    const plane = await Plane.findById(req.body.planeId).select("_id name position");
    if(!plane){
      return res.status(404).send(`plane not found`);
    }

    const newTakingof = new Takingof({
        takingofPlane: plane,
        takingofRightNow: false,
    });

    const savedTakingof = await newTakingof.save();
    if (!savedTakingof) return res.status(500).send("cant create the Takingof");
    res.status(200).send(newTakingof);
  } catch(error){
    next(error)
  }
};

exports.updateTakingof = async (req, res, next) => {

  try{

    const resTakingof = await Takingof.findByIdAndUpdate(
      req.params.id,
      {
        takingofRightNow: req.body.takingofRightNow,
      },
      { new: true }
    );

    if (!resTakingof)
      return res.status(404).send("Takingof with the spacific ID not found");
  
    res.status(200).send(resTakingof);

  }catch(error){
    next(error)
  }
};


exports.deleteTakingof = async (req, res, next) => {
  try{
    const resTakingof = await Takingof.findByIdAndRemove(req.params.id);
    if (!resTakingof)
      return res.status(404).send("Takingof with the spacific ID not found");
  
    res.status(200).send(resTakingof);
  }catch(error){
    next(error)
  }
};