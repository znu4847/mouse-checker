import SingleClick from "./SingleClick.js";
import DoubleClick from "./DoubleClick.js";
export default class LogRegister {
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
}
