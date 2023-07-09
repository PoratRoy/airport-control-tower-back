const { Plane } = require('../models/planes');
const ErrorResponse = require("../utils/errorResponse");

exports.getAllPlanes = async (req, res, next) => {
  try{
    res.status(200).send(await Plane.find());
  } catch(error){
    next(error)
  }
};

exports.getPlaneById = async (req, res, next) => {
  try{
    const resPlane = await Plane.findById(req.params.id);
    if (!resPlane)
      return res.status(404).send("plane with the spacific ID not found");
  
    res.status(200).send(resPlane);
  }catch(error){
    next(error)
  }
};


exports.addPlane = async (req, res, next) => {
  try {
    const newPlane = new Plane({
      name: renderNewPlaneName(),
      position: findStartPosition(),
      proper: true
    });

    const savedPlane = await newPlane.save();
    if (!savedPlane) return res.status(500).send("cant create the palne");
    res.status(200).send(newPlane);
  } catch(error){
    next(error)
  }
};

const renderNewPlaneName = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    return `${alphabet[Math.floor(Math.random() * alphabet.length)]}${Math.floor(Math.random()*30)+1}`;
}

const findStartPosition = () => {
    return Math.floor(Math.random()*2); // 0/1
}

exports.updatePlane = async (req, res, next) => {

  try{
    const resPlane = await Plane.findByIdAndUpdate(
      req.params.id,
      {
        position: req.body.position,
        proper: req.body.proper,
      },
      { new: true }
    );

    if (!resPlane)
      return res.status(404).send("palne with the spacific ID not found");
  
    res.status(200).send(resPlane);

  }catch(error){
    next(error)
  }
};


exports.deletePlane = async (req, res, next) => {
  try{
    const resPlane = await Plane.findByIdAndRemove(req.params.id);
    if (!resPlane)
      return res.status(404).send("plane with the spacific ID not found");
  
    res.status(200).send(resPlane);
  }catch(error){
    next(error)
  }
};