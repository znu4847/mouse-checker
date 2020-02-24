import SingleClick from "./SingleClick.js";
import DoubleClick from "./DoubleClick.js";
export default class ClickLogger {
  constructor() {
    this.totalLogMap = {
      0: [],
      1: [],
      2: []
    };
    this.clickLogMap = {
      0: [],
      1: [],
      2: []
    };
  }

  getRvsIter(logList) {
    let index = logList.length;
    let reversedIterator = {
      next: function() {
        index--;
        return {
          done: index < 0,
          value: logList[index]
        };
      }
    };
    reversedIterator[Symbol.iterator] = function() {
      return this;
    };
    return reversedIterator;
  }

  set addDown(event) {
    this.totalLogMap[event.button].push(event);
  }

  set addUp(upEvt) {
    const button = upEvt.button;
    let logList = this.totalLogMap[button];
    let clickList = this.clickLogMap[button];
    let lastClick = null;
    if (clickList.length > 0) {
      lastClick = clickList[clickList.length - 1];
    }
    this.clickLogMap[button].push(
      new SingleClick(logList[logList.length - 1], upEvt, lastClick)
    );
    this.totalLogMap[button].push(upEvt);
  }

  set addDbClick(event) {
    let clickLogList = this.clickLogMap[event.button];
    let second = clickLogList.pop();
    let first = clickLogList.pop();

    let beforeDbClick = null;
    if (clickLogList.length > 0) {
      beforeDbClick = clickLogList[clickLogList.length - 1];
    }

    clickLogList.push(new DoubleClick(first, second, beforeDbClick));
  }

  chartData(button) {
    if (button === 0) {
      return this.chartDataL();
    }
    return this.chartDataRW(button);
  }

  chartDataL() {
    let buttonLogs = this.clickLogMap[0];
    let chartData = [
      ["count", "down-up #1", "down-up #2", "second-first", "curr-last"],
      [0, 0, 0, 0, 0]
    ];
    buttonLogs.forEach((v, i) => {
      chartData.push([i + 1, ...v.chartData]);
    });
    return chartData;
  }

  chartDataRW(button) {
    let buttonLogs = this.clickLogMap[button];
    let chartData = [
      ["count", "down-up", "curr-last"],
      [0, 0, 0]
    ];
    buttonLogs.forEach((v, i) => {
      chartData.push([i + 1, v.chartData[0], v.chartData[3]]);
    });
    return chartData;
  }

  getHMax(button) {
    const chartData = this.chartData(button);
    let logLength = chartData.length;
    if (logLength < 10) {
      return 10;
    }
    return logLength;
  }

  getHMin(button) {
    const hMax = this.getHMax(button);
    if (hMax < 10) {
      return 0;
    }
    return hMax - 10;
  }

  chartOption(button) {
    const hMax = this.getHMax(button);
    const hMin = this.getHMin(button);
    let titleMap = { 0: "left-click", 1: "wheel-click", 2: "right-click" };
    return {
      title: titleMap[button],
      subtitle: "subtitle",
      explorer: {
        axis: "horizontal",
        maxZoomIn: 1,
        maxZoomOut: 1
      },
      vAxis: {
        title: "time-diff",
        viewWindow: {
          min: 0,
          max: 0.8
        }
      },
      hAxis: {
        gridlines: {
          count: 1
          // interval: 1
        },
        legend: { position: "top", textStyle: { color: "blue", fontSize: 16 } },
        // showTextEvery: true,
        isStacked: true,
        viewWindowMode: "pretty",
        viewWindow: {
          min: hMin,
          max: hMax
        }
      },
      focusTarget: "category"
    };
  }
}
