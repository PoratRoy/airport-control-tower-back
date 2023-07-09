
const {Strip} = require('../models/strips');

const SingeltonInitStrips = () =>{
  Strip.count({}, async function(err, count){
    if (err) {
        console.log(err);
      } else {
        if(count !== 8){
          await stripsInit()
        }
      }
  })
}


const stripsInit = async () => {
  try {
    for (let number = 1; number <= 8; number++) {
      const newStrip = new Strip({
        number: number,
        open: true,
        plane: null,
        stripTimeMls: 5000,
      });

      const savedStrip = await newStrip.save();
      if (!savedStrip) console.log("cant create the strip");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = SingeltonInitStrips;
