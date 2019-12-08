const robot = require('robotjs')


function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  await delay(2000)
  await console.log("starting to move")
  for (var g = 0; g < 5; g++) {
    await robot.keyTap("down")
    await delay(100)
  }
  for (var i = 0; i < 8
    ; i++) {
    for (var y = 0; y < 4; y++) {
      for (var x = 0; x < 7; x++) {
        await robot.moveMouseSmooth(132+(145*x),211+(165*y))
        await robot.mouseClick()
        await robot.keyTap("enter")
        await delay(10)
      }
    }
    for (var g = 0; g <5; g++) {
      await robot.keyTap("down")
      await delay(100)
    }
  }
})();
