export default class DoubleClick {
  constructor(first, second, beforeDbClick) {
    this.first = first;
    this.second = second;
    this.type = "double";
    this.beforeDbClick = beforeDbClick;
  }

  get down() {
    return this.first.down;
  }

  get up() {
    return this.second.up;
  }

  /**
   * time-interval
   */
  get tifd() {
    if (this.first === null || this.second === null) {
      return 0;
    }
    return this.second.down.timeStamp - this.first.up.timeStamp;
  }

  get ti() {
    if (this.beforeDbClick !== null) {
      // console.log("this.beforeDbClick is not null!");
      // console.log(this.beforeDbClick.up.timeStamp - this.first.down.timeStamp);
      return this.first.down.timeStamp - this.beforeDbClick.up.timeStamp;
    }
    return 0;
  }

  /**
   * button
   */
  get button() {
    return this.second.button;
  }

  get chartData() {
    return ["dbClick", this.first.ti, this.second.ti, this.tifd, this.ti];
  }
}
