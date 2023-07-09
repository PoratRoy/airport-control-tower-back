const { createNewPlane, getPlaneStartPositon } = require("./newPlane");
const { findNextStrip, updatePositionQueue, createNotOpenStripArray } = require("./newMove");
const { getAllStrips, getStripByNumber, updateStrip } = require('../repository/strips')
const { getScheduleByStripIdAndPlaneId, addSchedule, updateSchedule } = require('../repository/schedule')

const getNewPlane = async () => {

  const plane = await createNewPlane();
  const strip = await getPlaneStartPositon(plane);

  if (strip !== 0) {
    await updateStripOpenStatus(strip, plane);
    const resStrip = await getStripByNumber(strip);
    await addSchedule(plane._id, resStrip._id)
  }
  const strips = await getAllStrips();
  return strips;
};


const nextMove = async () => {
  const strips = await getAllStrips();
  let notOpenStrips = createNotOpenStripArray(strips);

  try{
    notOpenStrips.forEach(async (strip) => {
      let nextStrip = await findNextStrip(strip.plane.position, strip.number);
      if (nextStrip) { 

        await addSchedule(strip.plane._id, nextStrip._id)
        const schedule = await getScheduleByStripIdAndPlaneId(strip._id, strip.plane._id)
        await updateSchedule(schedule._id)

        if (nextStrip === "out") { // out
          await updatePositionQueue(strip.plane.position, strip.plane._id)
          await updateStripOpenStatus(strip.number, null);
        } else{ // in
          await updateStripOpenStatus(strip.number, null);
          await updateStripOpenStatus(nextStrip.number, strip.plane);
        }
      }
    });
  } catch(error){
    console.log(error);
  }

  return strips;
};



//-------------------//

const updateStripOpenStatus = async (number, plane) => {
  const strip = await getStripByNumber(number);
  const planeId = plane ? plane._id : null;
  await updateStrip(strip._id, planeId, !strip.open);
};

module.exports.getNewPlane = getNewPlane;
module.exports.nextMove = nextMove;
