export function circlesTouching(circle1: circle, circle2: circle): boolean {

  return (circle1.xPos === circle2.xPos && Math.abs(circle1.yPos - circle2.yPos) === 1) || (circle1.yPos === circle2.yPos && Math.abs(circle1.xPos - circle2.xPos) === 1) || (circle1.xPos + 1 === circle2.xPos && circle1.yPos - 1 === circle2.yPos) || (circle1.xPos + 1 === circle2.xPos && circle1.yPos + 1 === circle2.yPos);

}


export function linesTouching(circle1: circle, line1: line, circle2: circle, line2: line): boolean {
  return Math.abs(getLineX(line1) + getLineX(line2)) <= 0.1 && Math.abs(getLineY(line1) + getLineY(line2)) <= 0.1 // lines are parallel and go in opposite directions
    && Math.abs((getCircleX(circle1) + (getLineX(line1) * 100)) - (getCircleX(circle2) + (getLineX(line2) * 100))) <= 1 // 1 is the tolerance in the distance
    && Math.abs((getCircleY(circle1) + (getLineY(line1) * 100)) - (getCircleY(circle2) + (getLineY(line2) * 100))) <= 1
}


export interface circle {
  xPos: number,
  yPos: number,
  lines: line[]
}
export interface line {
  angle: number,
  correct: boolean
}


export function getLineX(line: line): number {
  return Math.cos(line.angle)
}
export function getLineY(line: line): number {
  return Math.sin(line.angle)
}
export function getCircleX(circle: circle): number {
  if (circle.yPos % 2 == 0) {
    return circle.xPos * 200 - 75
  }
  return circle.xPos * 200 + 25
}
export function getCircleY(circle: circle): number {
  let ret = 0;
  if (circle.yPos % 2 == 0) {
    ret = circle.yPos * 200 - (300 - (Math.sqrt(3) * 100))
  }
  else {
    ret = circle.yPos * 200 - 100
  }
  if (circle.yPos > 2) {
    ret -= 53 * Math.round(Number(circle.yPos / 2 - 1))
  }
  return ret
}
export function isWinnable(circleData: circle[]): boolean {
  let numLines = circleData.reduce((sum, current) => sum + current.lines.length, 0)
  console.log(numLines)
  if (numLines % 2 == 1) return false
  return false

  // function isValidCircle(circle: circle, circleData: circle[]): boolean { // recursive

  // }

  return true
}
export function getNeighborPositions(circle: circle, circleData: circle[]){
  let returnv: number[][] = [];
  for (let i = 0; i < circleData.length; i++){
    if ((circleData[i].xPos == circle.xPos + 1 || circleData[i].xPos == circle.xPos - 1) && circleData[i].yPos == circle.yPos){
      returnv.push([circleData[i].xPos, circleData[i].yPos])
    }
    if ((circleData[i].yPos == circle.yPos + 1 || circleData[i].yPos == circle.yPos - 1) && circleData[i].xPos == circle.xPos){
      returnv.push([circleData[i].xPos, circleData[i].yPos])
    }
    if ((circleData[i].yPos == circle.yPos + 1 || circleData[i].yPos == circle.yPos - 1) && (circleData[i].xPos == circle.xPos + 1)){
      returnv.push([circleData[i].xPos, circleData[i].yPos])
    }
  }
  return returnv
}
