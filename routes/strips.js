const express = require('express');
const router = express.Router();
const {getAllStrips, getStripById, addStrip, updateStrip, deleteStrip} = require('../controllers/strips');


//http://localhost:5000/api/strip/ -- get all strips
router.get('/',getAllStrips);

//http://localhost:5000/api/strip/:id -- get strip by id
router.get('/:id', getStripById);

//http://localhost:5000/api/strip/ -- add new strip
router.post('/', addStrip);

//http://localhost:5000/api/strip/:id -- update strip
router.put('/:id', updateStrip);

//http://localhost:5000/api/strip/:id -- delete strip
router.delete('/:id',deleteStrip);

module.exports = router;