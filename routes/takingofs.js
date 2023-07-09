const express = require('express');
const router = express.Router();
const {getAllTakingofs, getTakingofById, addTakingof, updateTakingof, deleteTakingof} = require('../controllers/takingofs');


//http://localhost:5000/api/takingof/ -- get all takingofs
router.get('/',getAllTakingofs);

//http://localhost:5000/api/takingof/:id -- get takingof by id
router.get('/:id', getTakingofById);

//http://localhost:5000/api/takingof/ -- add new takingof
router.post('/', addTakingof);

//http://localhost:5000/api/takingof/:id -- update takingof
router.put('/:id', updateTakingof);

//http://localhost:5000/api/takingof/:id -- delete takingof
router.delete('/:id',deleteTakingof);

module.exports = router;