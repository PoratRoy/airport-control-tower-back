
const {getAllTakingofs, addTakingof, updateTakingof} = require('../repository/takingofs');
const {getAllLandings, addLanding, updateLanding} = require('../repository/landings');
const {getStripByNumber} = require('../repository/strips');
const {addPlane} = require('../repository/planes');


const landing_strips_1 = [1, 2, 3, 4, 5, 6];
const takeof_strips_1 = [6, 8, 4];
const takeof_strips_2 = [7, 8, 4];

const createNewPlane = async () => {
  const position = findLandingOrOfPosition();
  
  let planeFromQueue;
  if (position === 0) {
    planeFromQueue = await getFirstPlaneInQeueu(await getAllLandings(), updateLanding)
  } else {
    planeFromQueue = await getFirstPlaneInQeueu(await getAllTakingofs(), updateTakingof)
  }

  if (!planeFromQueue) {
    planeFromQueue = await addPlane(position);
  }

  return planeFromQueue;
};


const getFirstPlaneInQeueu = async (allQueue, updatePositionHandler) =>{ 
  if(allQueue.length !== 0){
    let index = 0;
    while(allQueue[index].rightNow){
      if(index+1 === allQueue.length){
        index = -1;
        break;
      }
      index += 1;
    }

    if(index !== -1){
      const firstInQueue = allQueue[index];
      await updatePositionHandler(firstInQueue._id, true);   
      return firstInQueue.plane;
    }
    return null
  }
}


const findLandingOrOfPosition = () => {
  return Math.floor(Math.random() * 2); // 0/1
};

const getPlaneStartPositon = async (plane) => {

  let strip
  if(plane.position === 0){
    strip = await startLanding()
    strip === 0 ? await addLanding(plane.id, false) : await addLanding(plane.id, true);
  } else{
    strip = await startTakingof()
    strip === 0 ? await addTakingof(plane.id, false) : await addTakingof(plane.id, true);
  }

  return strip;
};

const startLanding = async () => {
  const strip1 = await getStripByNumber(1);
  return (strip1.open) ? landing_strips_1[0] : 0;
};

const startTakingof = async () => {

  const strip6 = await getStripByNumber(6);
  if(strip6.open){
    return takeof_strips_1[0]
  } else{
    const strip7 = await getStripByNumber(7);
    if(strip7.open){
      return takeof_strips_2[0]
    } else{
      return 0
    }
  }
};


module.exports.createNewPlane = createNewPlane;
module.exports.getPlaneStartPositon = getPlaneStartPositon;