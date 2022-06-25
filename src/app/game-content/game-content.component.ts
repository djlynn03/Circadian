import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import LinearGradient from 'zrender/lib/graphic/LinearGradient';
import { getCookie, setCookie } from 'typescript-cookie';

@Component({
  selector: 'app-game-content',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './game-content.component.html',
  styleUrls: ['./game-content.component.scss']
})
export class GameContentComponent implements OnInit {
  @ViewChild('myChart')
  myChartRef!: ElementRef;

  constructor() { }
  options: any;
  public userStats: string | undefined = getCookie('userStats');


  public timeStarted = false;
  public startTime = 0;

  public dailyCompleted: boolean = getCookie('dailyCompleted') == 'true';

  public displayStyle = "none";

  public circleData = [
    {
      xPos: 1, yPos: 1, lines: [{ angle: Math.PI * (5 / 3), correct: false }],
    },
    {
      xPos: 2, yPos: 1, lines: [{ angle: Math.PI * (4 / 3), correct: false }, { angle: Math.PI * (5 / 3), correct: false }],
    },
    {
      xPos: 2, yPos: 2, lines: [{ angle: Math.PI * (4 / 3), correct: false }, { angle: Math.PI * (5 / 3), correct: false }],
    },
    {
      xPos: 3, yPos: 2, lines: [{ angle: Math.PI * (4 / 3), correct: false }],
    },
  ]
  public getEmptyCircles(): Array<any> {
    let coordinates = this.circleData.map(circle => { return [circle.xPos, circle.yPos] })
    let res = [];
    for (let i = 1; i < 5; i++) { // col
      for (let j = 1; j < 5; j++) { // row
        if (j % 2 != 0 && i > 3) {
          continue
        }
        if (coordinates.includes([i, j])) {
          continue;
        }
        res.push({
          xPos: i,
          yPos: j,
          radius: 100,
          lines: []
        })

      }
    }
    return res;
  }

  ngOnInit(): void {
    console.log(JSON.parse(this.userStats!));
    if (this.dailyCompleted) {
      this.gameWin();
    }
  }
  public getLineX(line: any): number {
    return Math.cos(line.angle)
  }
  public getLineY(line: any): number {
    return Math.sin(line.angle)
  }
  public getCircleX(circle: any): number {
    if (circle.yPos % 2 == 0) {
      return circle.xPos * 200 + 100 - 200
    }
    return circle.xPos * 200 - 100 + 100
  }
  public getCircleY(circle: any): number {
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

  public moveCircle(circle: any, event: any): void {
    if (this.dailyCompleted) {
      return;
    }
    for (let i = 0; i < circle.lines.length; i++) {
      circle.lines[i].angle = circle.lines[i].angle + Math.PI / 3
      if (circle.lines[i].angle > Math.PI * 2) {
        circle.lines[i].angle = circle.lines[i].angle - Math.PI * 2
      }
    }
    if (!this.timeStarted) {
      this.timeStarted = true;
      this.startTime = new Date().getTime();
    }
    this.checkWin();
  }
  public resetCircles(): Array<any> {
    return this.circleData.map(circle => {
      return {
        xPos: circle.xPos,
        yPos: circle.yPos,
        radius: 100,
        lines: circle.lines.map(line => {
          return {
            angle: line.angle,
            correct: false
          }
        })
      }
    })
  }

  public circlesTouching(circle1: { radius: any; }, circle2: { radius: any; }): boolean {
    return Math.abs(
      Math.sqrt((this.getCircleX(circle1) - this.getCircleX(circle2)) ** 2 + (this.getCircleY(circle1) - this.getCircleY(circle2)) ** 2) // distance between circles
      - (circle1.radius + circle2.radius) // sum of radii
    ) <= 1 // 1 is the tolerance
  }
  public linesTouching(circle1: { radius: number; }, line1: any, circle2: { radius: number; }, line2: any): boolean {
    return Math.abs(this.getLineX(line1) + this.getLineX(line2)) <= 0.001 && Math.abs(this.getLineY(line1) + this.getLineY(line2)) <= 0.001 // lines are parallel and go in opposite directions
      && Math.abs((this.getCircleX(circle1) + (this.getLineX(line1) * circle1.radius)) - (this.getCircleX(circle2) + (this.getLineX(line2) * circle2.radius))) <= .01 // .01 is the tolerance
      && Math.abs((this.getCircleY(circle1) + (this.getLineY(line1) * circle1.radius)) - (this.getCircleY(circle2) + (this.getLineY(line2) * circle2.radius))) <= .01
  }
  public checkWin(): void {
    var newItems = this.resetCircles();
    for (let circle1 of newItems) {
      for (let circle2 of newItems) {
        if (circle1 == circle2) {
          continue;
        }
        if (this.circlesTouching(circle1, circle2)) {
          for (let line1 of circle1.lines) {
            for (let line2 of circle2.lines) {
              if (line1 == line2) {
                continue;
              }
              if (this.linesTouching(circle1, line1, circle2, line2)) {
                line1.correct = true
                line2.correct = true
              }
            }
          }
        }
      }
    }
    let totalCorrect = newItems.filter(circle => { return circle.lines.filter((line: { correct: any; }) => { return line.correct }).length == circle.lines.length }).length
    if (totalCorrect == newItems.length) {
      this.gameWin();
    }
    this.circleData = newItems;
  }
  public closeModal(): void {
    this.displayStyle = "none";
  }

  public gameWin(): void {
    this.displayStyle = "block";
    this.dailyCompleted = true;

    // let midnight = new Date(new Date().getTime() + 15 * 60 * 1000)
    let untilMidnight = new Date().setHours(24, 0, 0, 0).valueOf() - new Date().valueOf();
    console.log(untilMidnight / 1000 / 60 / 60 / 24)
    if (getCookie("dailyCompleted") == "false" || getCookie("dailyCompleted") == undefined) {
      setCookie("dailyCompleted", "true", { expires: untilMidnight / 1000 / 60 / 60 / 24 });
      let timeElapsed = new Date().getTime() - this.startTime;
      let previousTimes = []
      if (getCookie('userStats') != undefined) {
        previousTimes = JSON.parse(getCookie('userStats')!).timeElapsed;
        console.log(previousTimes)
        setCookie('userStats', JSON.stringify({
          'timeElapsed': timeElapsed + "," + previousTimes,
          }), {expires: 999999});
      }else{
      // let previousTimes = JSON.parse(getCookie('userStats')!).timeElapsed;
      // console.log(previousTimes);
      setCookie('userStats', JSON.stringify({
        'timeElapsed': [timeElapsed],
        }), {expires: 999999});
      }

    }
    this.onChartInit();

  }

  public onChartInit() {

    const timeData: number[] = JSON.parse(getCookie('userStats')!).timeElapsed.split(',').map((time: string) => { return Math.round(Number(time) / 1000) }).sort((a: number, b: number) => { return a - b });
    const dataAxis = [...(new Set(timeData))];
    const data = dataAxis.map((time: number) => { return (timeData.filter((time2: number) => { return time2 == time }).length / timeData.length) * 100});
    console.log(dataAxis, data)

    this.options = {
      // title: {
      //   text: 'Check Console for Events',
      // },
      xAxis: {
        data: dataAxis,
        title: "Time (s)",
        axisLabel: {
          color: '#fff',
          formatter: '{value}s'
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        z: 10,
        interval: 10,
      },
      yAxis: {
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          textStyle: {
            color: '#999',
          },
          formatter: '{value}' + '%',
        },

      },
      tooltip: {
        trigger: 'item',
        showDelay: 0,
        transitionDuration: 0.2,
        formatter: function (params: any) {
          return `<b>${params['name']}s</b> : ${params['value']}` + '%';
        }
      },
      dataZoom: [
        {
          type: 'inside',
        },
      ],
      series: [
        // {
        //   // For shadow
        //   type: 'bar',
        //   itemStyle: {
        //     color: 'rgba(0,0,0,0.0)'
        //   },
        //   barGap: '-100%',
        //   barCategoryGap: '40%',
        //   data: dataShadow,
        //   animation: true,
        // },
        {
          type: 'bar',
          itemStyle: {
            color: new LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' },
            ]),
          },
          emphasis: {
            itemStyle: {
              color: new LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' },
              ]),
            }
          },
          data,
        },
      ],
    }
  }
}

