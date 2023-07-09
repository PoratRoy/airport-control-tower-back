const { getNewPlane, nextMove } = require("../logic/controlTower");
const { getAllLandings } = require('../repository/landings')
const { getAllTakingofs } = require('../repository/takingofs')
const { getAllSchedules } = require('../repository/schedule')

module.exports = function (server) {
  const io = require("socket.io").listen(server);

  //connect
  io.on("connect", (socket) => {
    setInterval(async function () {
      await sendNewPlane();
      await updateLandingsList();
      await updateTakingofsList();
      await updateScheduleList();
    }, 3500);

    const sendNewPlane = async () => {
      const strips = await getNewPlane();
      io.emit("newPlaneArrive", strips);
    };
    
    const updateLandingsList = async () =>{
      const landings = await getAllLandings();
      io.emit("updateLandingsList", landings);
    }

    const updateTakingofsList = async () =>{
      const takingofs = await getAllTakingofs();
      io.emit("updateTakingofsList", takingofs);
    }

    const updateScheduleList = async () =>{
      const data = await getAllSchedules();
      io.emit("updateScheduleList", data);
    }

    setInterval(async function () {
      await updateMoves();
    }, 1500);

    const updateMoves = async () => {
      const strips = await nextMove();
      io.emit("updateMoves", strips);
    };
  });

  return io;
};
