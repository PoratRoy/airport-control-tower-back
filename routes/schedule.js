const express = require('express');
const router = express.Router();
const {getAllSchedules, getScheduleById, addSchedule, updateSchedule, deleteSchedule} = require('../controllers/schedule');


//http://localhost:5000/api/schedule/ -- get all schedules
router.get('/',getAllSchedules);

//http://localhost:5000/api/schedule/:id -- get schedule by id
router.get('/:id', getScheduleById);

//http://localhost:5000/api/schedule/ -- add new schedule
router.post('/', addSchedule);

//http://localhost:5000/api/schedule/:id -- update schedule
router.put('/:id', updateSchedule);

//http://localhost:5000/api/schedule/:id -- delete schedule
router.delete('/:id',deleteSchedule);

module.exports = router;