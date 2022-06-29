import { circle, getNeighborPositions, line } from "./helpers";
// import { generate } from "./game-gen";

// export function getGame(seed: number): Array<any> {
//   const randSeed = ((s: number) => {
//     return function () {
//       s = Math.sin(s) * 10000; return s - Math.floor(s);
//     };
//   });
//   let gameSeed = randSeed(seed)();
//   const games = generate()

//   return games
// }
function randRange(min: number, max: number, seed: number) {
  return Math.floor(seed * (max - min + 1)) + min;
}
export function gameDecode(gameStr: string): circle[] {
  /*
  [0] = circle position from 1-e (1-14)
  [1:] = lines
  1,01;2,25;3,4;11.3;

  */
  let circleData: circle[] = [];
  let tempX, tempY: number;
  let currentCircle: string;
  let circleStr: string;
  let linesStr: string;
  let currentLines: line[] = [];
  for (let i = 0; i < gameStr.split(";").length; i++){

    circleStr = gameStr.split(";")[i].split(",")[0];
    linesStr = gameStr.split(";")[i].split(",")[1];

    switch (true){
      case ([1,2,3]).indexOf(Number(circleStr)) > -1:
        tempX = Number(circleStr);
        tempY = 1;
        break
      case ([4,5,6,7]).indexOf(Number(circleStr)) > -1:
        tempX = Number(circleStr) - 3;
        tempY = 2;
        break
      case ([8,9,10]).indexOf(Number(circleStr)) > -1:
        tempX = Number(circleStr) - 7;
        tempY = 3;
        break
      case ([11,12,13,14]).indexOf(Number(circleStr)) > -1:
        tempX = Number(circleStr) - 10;
        tempY = 4;
        break
      default:
        tempX = 0, tempY = 0;
    }

    currentLines = linesStr.split("").map((char) => {
      return {angle: Math.PI * (Number(char) / 3), correct: false}
    });

    circleData.push({
      xPos: tempX,
      yPos: tempY,
      lines: currentLines,
    })
  }
  return circleData;
}

// manual entry or generate list based on string format
export const gameList = ["1,01;2,25;3,4;11,3"];
