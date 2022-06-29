import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import LinearGradient from 'zrender/lib/graphic/LinearGradient';
import { generatev2 } from './game-gen';
import { gameDecode } from './gamesets';
import { circlesTouching, linesTouching, getCircleX, getCircleY, getLineX, getLineY, circle, line } from './helpers';

@Component({
  selector: 'app-game-content',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './game-content.component.html',
  styleUrls: ['./game-content.component.scss'],
})
export class GameContentComponent implements OnInit {
  public getCircleX = getCircleX;
  public getCircleY = getCircleY;
  public getLineX = getLineX;
  public getLineY = getLineY;

  constructor() { }
  options: any;
  public userStats: string | null = localStorage.getItem('userStats');

  public currentBest: number = 0;

  public timeStarted = false;
  public startTime = 0;
  public timeElapsed = 0;
  public timer = "0.0"
  public timeInterval: NodeJS.Timer | undefined;

  public dailyCompletedTime: Date = new Date(Number(localStorage.getItem('dailyCompletedTime')));
  public dailyCompleted: boolean = this.getDailyCompleted();

  public timeSeed = new Date().setHours(0, 0, 0, 0).valueOf();

  public getDailyCompleted(): boolean {
    // if (localStorage.getItem('dailyCompleted') == 'true' && this.dailyCompletedTime.getTime() > new Date(Number(localStorage.getItem('resetTime'))).getTime()) {
    if (localStorage.getItem('dailyCompleted') == 'true' && Date.now() > new Date(Number(localStorage.getItem('resetTime'))).getTime()) {
      localStorage.setItem('dailyCompleted', 'false');
      return false;
    } else {
      return localStorage.getItem('dailyCompleted') == 'true';
    }
  }

  public displayStyle = "none";

  // pick random message on win
  public winChoices = ["Well done!", "You win!"]
  public winMsg = this.initWinMsg();
  public initWinMsg(): string {
    return this.winChoices[Math.floor(Math.random() * this.winChoices.length)]
  }


  public circleData = this.initCircleData();

  public initCircleData(): Array<circle> {
    if (this.dailyCompleted){
      return JSON.parse(localStorage.getItem('gameState')!);
    }
    // return getGame(this.timeSeed);
    // return gameDecode("1,01;2,25;3,4;5,3");
    // return gameDecode(generatev2());
    return [{'xPos': 1, 'yPos': 1, 'lines': [{'angle': 2.0943951023931953, 'correct': false}, {'angle': 0, 'correct': false}, {'angle': 1.0471975511965976, 'correct': false}]}, {'xPos': 2, 'yPos': 1, 'lines': [{'angle': 2.0943951023931953, 'correct': false}, {'angle': 3.141592653589793, 'correct': false}, {'angle': 0, 'correct': false}, {'angle': 1.0471975511965976, 'correct': false}]}, {'xPos': 3, 'yPos': 1, 'lines': [{'angle': 2.0943951023931953, 'correct': false}, {'angle': 3.141592653589793, 'correct': false}, {'angle': 1.0471975511965976, 'correct': false}]}, {'xPos': 3, 'yPos': 2, 'lines': [{'angle': 5.235987755982989, 'correct': false}, {'angle': 1.0471975511965976, 'correct': false}, {'angle': 3.141592653589793, 'correct': false}, {'angle': 0, 'correct': false}, {'angle': 4.1887902047863905, 'correct': false}, {'angle': 2.0943951023931953, 'correct': false}]}, {'xPos': 4, 'yPos': 2, 'lines': [{'angle': 3.141592653589793, 'correct': false}, {'angle': 4.1887902047863905, 'correct': false}, {'angle': 2.0943951023931953, 'correct': false}]}, {'xPos': 3, 'yPos': 3, 'lines': [{'angle': 4.1887902047863905, 'correct': false}, {'angle': 3.141592653589793, 'correct': false}, {'angle': 5.235987755982989, 'correct': false}]}, {'xPos': 2, 'yPos': 3, 'lines': [{'angle': 4.1887902047863905, 'correct': false}, {'angle': 2.0943951023931953, 'correct': false}, {'angle': 3.141592653589793, 'correct': false}, {'angle': 0, 'correct': false}, {'angle': 5.235987755982989, 'correct': false}]}, {'xPos': 2, 'yPos': 4, 'lines': [{'angle': 5.235987755982989, 'correct': false}, {'angle': 3.141592653589793, 'correct': false}, {'angle': 4.1887902047863905, 'correct': false}]}, {'xPos': 1, 'yPos': 3, 'lines': [{'angle': 4.1887902047863905, 'correct': false}, {'angle': 2.0943951023931953, 'correct': false}, {'angle': 0, 'correct': false}, {'angle': 5.235987755982989, 'correct': false}, {'angle': 1.0471975511965976, 'correct': false}]}, {'xPos': 1, 'yPos': 4, 'lines': [{'angle': 5.235987755982989, 'correct': false}, {'angle': 0, 'correct': false}]}, {'xPos': 1, 'yPos': 2, 'lines': [{'angle': 5.235987755982989, 'correct': false}, {'angle': 1.0471975511965976, 'correct': false}, {'angle': 0, 'correct': false}]}, {'xPos': 2, 'yPos': 2, 'lines': [{'angle': 5.235987755982989, 'correct': false}, {'angle': 1.0471975511965976, 'correct': false}, {'angle': 3.141592653589793, 'correct': false}, {'angle': 0, 'correct': false}, {'angle': 4.1887902047863905, 'correct': false}, {'angle': 2.0943951023931953, 'correct': false}]}];
  }
  public getEmptyCircles(): Array<circle> {
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
          lines: []
        })

      }
    }
    return res;
  }

  ngOnInit(): void {
    if (this.userStats != undefined) {
      this.currentBest = JSON.parse(this.userStats!).best
    }
    if (this.dailyCompleted) {
      this.gameWin();
    }
  }


  public moveCircle(circle: circle): void {
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
      this.initTimer()
    }
    this.checkWin();
  }

  public initTimer(): void {
    this.timeInterval = setInterval(() => {
      this.timer = String(Math.round((Date.now() - this.startTime) / 100) / 10);
      if (this.timer.indexOf(".") == -1){
        this.timer += ".0"
      }
    }, 100);
    // this.timer = Date.now() - this.startTime;
  }

  public stoptimer(): void {
    clearInterval(this.timeInterval);
  }

  public resetCircles(): Array<circle> {
    return this.circleData.map(circle => {
      return {
        xPos: circle.xPos,
        yPos: circle.yPos,
        lines: circle.lines.map((line: { angle: number; }) => {
          return {
            angle: line.angle,
            correct: false
          }
        })
      }
    })
  }
  public checkWin(): void {
    var newItems = this.resetCircles();
    for (let circle1 of newItems) {
      for (let circle2 of newItems) {
        if (circle1 == circle2) {
          continue;
        }
        if (circlesTouching(circle1, circle2)) {
          for (let line1 of circle1.lines) {
            for (let line2 of circle2.lines) {
              if (line1 == line2) {
                continue;
              }
              if (linesTouching(circle1, line1, circle2, line2)) {
                line1.correct = true
                line2.correct = true
              }
            }
          }
        }
      }
    }
    let totalCorrect = newItems.filter(circle => { return circle.lines.filter((line: { correct: boolean; }) => { return line.correct }).length == circle.lines.length }).length
    this.circleData = newItems;
    if (totalCorrect == newItems.length) {
      this.gameWin();
    }

  }
  public closeModal(): void {
    this.displayStyle = "none";
    // document.getElementsByClassName("modal-container")[0].classList.remove("shown");
    // document.getElementsByClassName("modal-container")[0].classList.add("hidden");
  }

  public gameWin(): void {
    this.displayStyle = "block";
    // document.getElementsByClassName("modal-container")[0].classList.add("shown");
    // document.getElementsByClassName("modal-container")[0].classList.remove("hidden");
    this.dailyCompleted = true;
    localStorage.setItem('gameState', JSON.stringify(this.circleData));
    // let midnight = new Date(new Date().getTime() + 15 * 60 * 1000)
    if (localStorage.getItem("dailyCompleted") == "false" || localStorage.getItem("dailyCompleted") == undefined) {
      localStorage.setItem("dailyCompleted", "true");
      localStorage.setItem("dailyCompletedTime", new Date().getTime().toString());
      localStorage.setItem('resetTime', new Date().setHours(24, 0, 0, 0).valueOf().toString());
      let timeElapsed = new Date().getTime() - this.startTime;
      let previousTimes = []
      if (localStorage.getItem('userStats') != undefined) {
        previousTimes = JSON.parse(localStorage.getItem('userStats')!).timeElapsed;
        localStorage.setItem('userStats', JSON.stringify({
          'timeElapsed': timeElapsed + "," + previousTimes,
          'previous': timeElapsed,
          'best': JSON.parse(localStorage.getItem('userStats')!).best,
        }));
        this.timeElapsed = JSON.parse(localStorage.getItem('userStats')!).previous;
      } else {
        localStorage.setItem('userStats', JSON.stringify({
          'timeElapsed': timeElapsed.toString(),
          'previous': timeElapsed,
          'best': timeElapsed,
        }));
        this.timeElapsed = JSON.parse(localStorage.getItem('userStats')!).previous;;
      }
      if (JSON.parse(localStorage.getItem('userStats')!).best > timeElapsed || JSON.parse(localStorage.getItem('userStats')!).best == undefined) {
        localStorage.setItem('userStats', JSON.stringify({
          'timeElapsed': JSON.parse(localStorage.getItem('userStats')!).timeElapsed,
          'best': timeElapsed,
          'previous': timeElapsed
        }))
        this.currentBest = timeElapsed;
      }
      else {
        localStorage.setItem('userStats', JSON.stringify({
          'timeElapsed': JSON.parse(localStorage.getItem('userStats')!).timeElapsed,
          'best': JSON.parse(localStorage.getItem('userStats')!).best,
          'previous': timeElapsed
        }));
        this.currentBest = JSON.parse(localStorage.getItem('userStats')!).best;
      }
    } else {
      this.timeElapsed = JSON.parse(localStorage.getItem('userStats')!).previous;
      this.currentBest = JSON.parse(localStorage.getItem('userStats')!).best;
    }

    this.onChartInit();

  }
  public openStatsModal(){
    this.displayStyle = "block";

    this.onChartInit();
  }

  public onChartInit() {
    const timeData: number[] = JSON.parse(localStorage.getItem('userStats')!).timeElapsed.split(',').map((time: string) => { return Math.ceil(Number(time) / 1000) }).sort((a: number, b: number) => { return a - b });
    const dataAxis = [...(new Set(timeData))];
    const data = dataAxis.map((time: number) => { return Math.round((timeData.filter((time2: number) => { return time2 == time }).length / timeData.length) * 100) });
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

