const {getStripByNumber} = require('../repository/strips');
const { updateLanding, getLandingByPlaneId } = require('../repository/landings')
const { updateTakingof, getTakingofByPlaneId } = require('../repository/takingofs')


const landing_strips_1 = [1, 2, 3, 4, 5, 6];
const landing_strips_2 = [1, 2, 3, 4, 5, 7];
const takeof_strips_1 = [6, 8, 4];
const takeof_strips_2 = [7, 8, 4];

const findNextStrip = async (position, num) => {
  return position === 0
    ? await returnStrip(landing_strips_1, landing_strips_2, num)
    : await returnStrip(takeof_strips_1, takeof_strips_2, num);
};

const returnStrip = async (option1, option2, num) => {
  let index1, index2;

  index1 = option1.indexOf(num) !== -1 ? option1.indexOf(num) + 1 : 0;
  index2 = option2.indexOf(num) !== -1 ? option2.indexOf(num) + 1 : 0;

  if (index1 >= option1.length || index2 >= option2.length) return "out";

  if (index1 === 0) {
    const strip2 = await getStripByNumber(option2[index2]);
    return strip2.open ? strip2 : null; 
  } else if (index2 === 0) {
    const strip1 = await getStripByNumber(option1[index1]);
    return strip1.open ? strip1 : null; 
  } else {
    const strip1 = await getStripByNumber(option1[index1]);
    const strip2 = await getStripByNumber(option2[index2]);
    return strip1.open ? strip1 : strip2.open ? strip2 : null;
  }
};


const createNotOpenStripArray = (strips) =>{
  let notOpenStrips = [];
  
  strips.forEach((strip) => {
    //for knowing which strip has plane in it that need to move
    if (!strip.open && strip.plane) {
      if(strip.plane.proper){
        notOpenStrips.push({ _id:strip._id, plane: strip.plane, number: strip.number });
      }
    }
  });
  return notOpenStrips;
}

const updatePositionQueue = async (position, planeId) => {
  if(position === 0){
    const landing = await getLandingByPlaneId(planeId);
    await updateLanding(landing._id, false);
  } else{
    const takingof = await getTakingofByPlaneId(planeId);
    await updateTakingof(takingof._id, false);
  }
}

module.exports.findNextStrip = findNextStrip;
module.exports.createNotOpenStripArray = createNotOpenStripArray;
module.exports.updatePositionQueue = updatePositionQueue;