const fs = require('fs')
const gm = require('gm')

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var numOfPanels = 11

var rowLegnth = Math.ceil(numOfPanels/3);

(async () => {
  for (var i = 0; i < numOfPanels; i=i+3) {
    await gm("panel"+(i+1)+".png")
    .append("panel"+(i+2)+".png")
    .append("panel"+(i+3)+".png")
  //  .crop(850,1665,0,0)
    .write('subpanel'+Math.floor(i/3)+'.png', function (err) {
      if (!err) console.log('donepanels'+i);
      if (err) console.log(err);
    });
    await delay(1000)
  }
})();

(async () => {
  await delay((1500*Math.ceil(numOfPanels/3))+300) // wait for subpanels to be made.
  for (var i = 0; i < rowLegnth-1; i++) {
    await gm("subpanel0.png")
    .append("subpanel"+(i+1)+".png", true)
    .write("subpanel0.png", function (err) {
      if (!err) console.log('donesub'+(i+1));
      if (err) console.log(err);
    });
    await delay(7500)
  }
})();
