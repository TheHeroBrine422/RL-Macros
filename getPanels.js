const screenshot = require('desktop-screenshot')
const fs = require('fs')
const gm = require('gm')
const robot = require('robotjs')
// Assumes rocket league is open, and at the inventory or in a trade window. Top row of items selected.

var tradeWindow = true; // true = you are doing this from a trade window, false = you are doing this from regular inventory.

var offset = [500,460];

if (tradeWindow) {
  offset = [710, 625];
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  await robot.keyTap("1", ["command"])
/*  await delay(3500)
  await robot.keyTap("down")
  await delay(100)
  await robot.keyTap("down")
  await delay(100)
  await robot.keyTap("down")
  await delay(100)*/
  for (var i = 0; i < 30; i++) {
    await delay(8000)
    await screenshot("screenshot.png", function(error, complete) {
      (async () => {
        if(error) {
          console.log("Screenshot failed", error);
        } else {
          await console.log("Screenshot succeeded");
        	await delay(1100)
          gm('screenshot.png')
          .crop(850, 555, offset[0], offset[1])
          .write('panel'+i+'.png', function (err) {
            if (!err) console.log('done');
            if (err) console.log(err);
          });
        }
      })();
    });
    for (var g = 0; g < 4; g++) {
      await robot.keyTap("down")
      await delay(100)
    }
  }
})();
