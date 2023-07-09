const express = require('express');
const router = express.Router();
const {getAllPlanes, getPlaneById, addPlane, updatePlane, deletePlane} = require('../controllers/planes');


//http://localhost:5000/api/plane/ -- get all planes
router.get('/',getAllPlanes);

//http://localhost:5000/api/plane/:id -- get plane by id
router.get('/:id', getPlaneById);

//http://localhost:5000/api/plane/ -- add new plane
router.post('/', addPlane);

//http://localhost:5000/api/plane/:id -- update plane
router.put('/:id', updatePlane);

//http://localhost:5000/api/plane/:id -- delete plane
router.delete('/:id',deletePlane);

module.exports = router;