const fs = require('fs')
const gm = require('gm')

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var numOfPanels = 18

var rowLegnth = Math.ceil(numOfPanels/3);

(async () => {
  for (var i = 0; i < numOfPanels; i=i+3) {
    await gm("output/panel"+(i+1)+".png")
    .append("output/panel"+(i+2)+".png")
    .append("output/panel"+(i+3)+".png")
  //  .crop(850,1665,0,0)
    .write('output/subpanel'+Math.floor(i/3)+'.png', function (err) {
      if (!err) console.log('donepanels'+i);
      if (err) console.log(err);
    });
    await delay(1000)
  }
})();

(async () => {
  await delay((1500*Math.ceil(numOfPanels/3))+300) // wait for subpanels to be made.
  for (var i = 0; i < rowLegnth-1; i++) {
    await gm("output/subpanel0.png")
    .append("output/subpanel"+(i+1)+".png", true)
    .write("output/subpanel0.png", function (err) {
      if (!err) console.log('donesub'+(i+1));
      if (err) console.log(err);
    });
    await delay(7500)
  }
})();
