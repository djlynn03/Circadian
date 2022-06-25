// use to make gameset array
export function generate() {
  let y1 = Math.ceil(Math.random() * 4)
  let x1 = 1;
  if (y1 % 2 == 0) {
    x1 = Math.ceil(Math.random() * 4)
  } else {
    x1 = Math.ceil(Math.random() * 3)
  }
  let a1 = 0;
  let lines1: { angle: number; correct: boolean; }[] = []
  let tempLine: any = {}
  tempLine = { angle: Math.PI * [0, 1 / 3, 2 / 3, 3 / 3, 4 / 3, 5 / 3][Math.floor(Math.random() * 6)], correct: false }
  if (!lines1.find((line) => line.angle = tempLine.angle)) lines1.push({ angle: Math.PI * [0, 1 / 3, 2 / 3, 3 / 3, 4 / 3, 5 / 3][Math.floor(Math.random() * 6)], correct: false })
  console.log(lines1)
  let data = []
  data.push(
    {
      xPos: x1, yPos: y1, lines: lines1,
    }
  )
  for (let _ = 0; _ < 14; _++) {
    let rand = Math.random();
    switch (true) {
      case rand <= 0.25:
        y1 += 1
        break;
      case rand <= 0.5:
        y1 -= 1
        break;
      case rand <= 0.75:
        x1 += 1
        break;
      default:
        x1 -= 1
        break;
    }
    while ((y1 % 2 == 0 && x1 > 4) || (y1 % 2 == 1 && x1 > 3)) {
      x1 -= 1
    }
    while (y1 % 2 == 0 && x1 < 1) {
      x1 += 1
    }
    while (y1 > 4) {
      y1 -= 1
    }
    while (y1 < 0) {
      y1 += 1
    }
    lines1 = []
    let tempLine: any = {}
    for (let _ = 0; _ < 3; _++){
      tempLine = { angle: Math.PI * [0, 1 / 3, 2 / 3, 3 / 3, 4 / 3, 5 / 3][Math.floor(Math.random() * 6)], correct: false }
      if (!lines1.find((line) => line.angle = tempLine.angle)) lines1.push({ angle: Math.PI * [0, 1 / 3, 2 / 3, 3 / 3, 4 / 3, 5 / 3][Math.floor(Math.random() * 6)], correct: false })
    }

      data.push(
        {
          xPos: x1, yPos: y1, lines: lines1,
        }
      )

  }
  console.log(data)
  return data
}
