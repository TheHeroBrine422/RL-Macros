const screenshot = require('desktop-screenshot')
const fs = require('fs')
const gm = require('gm')
const robot = require('robotjs')
// Assumes rocket league is open, and at the inventory or in a trade window.
// 1920x1200 8:5

var tradeWindow = false; // true = you are doing this from a trade window, false = you are doing this from regular inventory.

var offset = [500,460];

if (tradeWindow) {
  offset = [400, 385];
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  await robot.keyTap("1", ["command"])
  await delay(3500)
  console.log("Going up to top row of inv.")
  for (var g = 0; g < 70; g++) {
    await robot.keyTap("up")
    await delay(100)
  }
  console.log("Going to bottom row of page.")
  for (var g = 0; g < 3; g++) {
    await robot.keyTap("down")
    await delay(100)
  }
  for (var i = 0; i < 30; i++) {
    console.log("Waiting for page to fully load. (This will take 5s no matter what.)")
    await delay(5000)
    console.log("Taking screenshot #"+i)
    await screenshot("screenshot.png", function(error, complete) {
      (async () => {
        if(error) {
          console.log("screenshot #"+i+" failed", error);
        } else {
          await console.log("screenshot #"+i+" succeeded");
        	await delay(1100)
          gm('screenshot.png')
          .crop(1025, 675, offset[0], offset[1])
          .write('output/panel'+i+'.png', function (err) {
            if (!err) console.log("screenshot #"+(i-1)+" cropped");
            if (err) console.log(err);
          });
        }
      })();
    });
    await delay(500)
    console.log("Advancing to next page.")
    for (var g = 0; g < 4; g++) {
      await robot.keyTap("down")
      await delay(100)
    }
  }
})();
