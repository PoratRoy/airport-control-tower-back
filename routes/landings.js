const express = require('express');
const router = express.Router();
const {getAllLandings, getLandingById, addLanding, updateLanding, deleteLanding} = require('../controllers/landings');


//http://localhost:5000/api/landing/ -- get all landings
router.get('/',getAllLandings);

//http://localhost:5000/api/landing/:id -- get landing by id
router.get('/:id', getLandingById);

//http://localhost:5000/api/landing/ -- add new landing
router.post('/', addLanding);

//http://localhost:5000/api/landing/:id -- update landing
router.put('/:id', updateLanding);

//http://localhost:5000/api/landing/:id -- delete landing
router.delete('/:id',deleteLanding);

module.exports = router;