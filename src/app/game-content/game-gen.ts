// import { isWinnable, line } from "./helpers";

import { gameDecode } from "./gamesets";
import { circle, getNeighborPositions } from "./helpers";

// use to make gameset array
// export function generate() {
//   let y1 = Math.ceil(Math.random() * 4)
//   let x1 = 1;
//   if (y1 % 2 == 0) {
//     x1 = Math.ceil(Math.random() * 4)
//   } else {
//     x1 = Math.ceil(Math.random() * 3)
//   }
//   let a1 = 0;
//   let lines1: { angle: number; correct: boolean; }[] = []
//   let tempLine: line;
//   tempLine = { angle: Math.PI * [0, 1 / 3, 2 / 3, 3 / 3, 4 / 3, 5 / 3][Math.floor(Math.random() * 6)], correct: false }
//   if (!lines1.find((line) => line.angle = tempLine.angle)) lines1.push({ angle: Math.PI * [0, 1 / 3, 2 / 3, 3 / 3, 4 / 3, 5 / 3][Math.floor(Math.random() * 6)], correct: false })

//   let data = []
//   data.push(
//     {
//       xPos: x1, yPos: y1, lines: lines1,
//     }
//   )
//   for (let _ = 0; _ < 14; _++) {
//     let rand = Math.random();
//     switch (true) {
//       case rand <= 0.25:
//         y1 += 1
//         break;
//       case rand <= 0.5:
//         y1 -= 1
//         break;
//       case rand <= 0.75:
//         x1 += 1
//         break;
//       default:
//         x1 -= 1
//         break;
//     }
//     while ((y1 % 2 == 0 && x1 > 4) || (y1 % 2 == 1 && x1 > 3)) {
//       x1 -= 1
//     }
//     while (y1 % 2 == 0 && x1 < 1) {
//       x1 += 1
//     }
//     while (y1 > 4) {
//       y1 -= 1
//     }
//     while (y1 < 0) {
//       y1 += 1
//     }
//     lines1 = []
//     let tempLine: line;
//     for (let _ = 0; _ < 3; _++){
//       tempLine = { angle: Math.PI * [0, 1 / 3, 2 / 3, 3 / 3, 4 / 3, 5 / 3][Math.floor(Math.random() * 6)], correct: false }
//       if (!lines1.find((line) => line.angle = tempLine.angle)) lines1.push({ angle: Math.PI * [0, 1 / 3, 2 / 3, 3 / 3, 4 / 3, 5 / 3][Math.floor(Math.random() * 6)], correct: false })
//     }

//       data.push(
//         {
//           xPos: x1, yPos: y1, lines: lines1,
//         }
//       )

//   }
//   console.log(data, isWinnable(data))
//   return data
// }

// 1,01;2,25;3,4;5,3

export function generatev2(): string {
  let circlePositions = []
  let numLines = 0;
  let currentLines: number[] = []
  let tempLine = 0;
  let tempPos = 0
  let gameStr = "";
  let previousCircles: circle[];

  for (let i = 0; i < 14; i++) {
    currentLines = []
    if (Math.random() > 0.8) {
      continue;
    }
    if (gameStr.length > 0) {
      previousCircles = gameDecode(gameStr.substring(0, gameStr.length - 1));
    }else{
      previousCircles = []
    }
    tempPos = Math.ceil(Math.random() * 14)
    if (circlePositions.length >= 0 && circlePositions.indexOf(tempPos) == -1) {
      circlePositions.push(tempPos)
      for (let j = 0; j < 4; j++) {
        tempLine = Math.floor(Math.random() * 6);
        if (Math.random() < 0.75 && currentLines.indexOf(tempLine) == -1 && currentLines.length < getNeighborPositions(previousCircles[previousCircles.length - 1], previousCircles).length) {

          currentLines.push(tempLine)
          numLines += 1;
        }
      }
      if (currentLines.length == 0) {
        currentLines.push(Math.floor(Math.random() * 6))
        numLines += 1
      }
      gameStr += String(tempPos) + "," + currentLines.join('') + ";"
    }


  }
  return gameStr.substring(0, gameStr.length - 1)
}
generatev2();
