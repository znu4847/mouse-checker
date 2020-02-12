export default class SingleClick {
  constructor(down, up, lastClick) {
    this.down = down;
    this.up = up;
    this.type = "single";
    this.lastClick = lastClick;
  }

  /**
   * time-interval
   */
  get ti() {
    if (this.down === null || this.up === null) {
      return 0;
    }
    return this.up.timeStamp - this.down.timeStamp;
  }

  /**
   * time-interval from last click
   */
  get til() {
    if (this.lastClick === null) {
      return 0;
    }
    return this.down.timeStamp - this.lastClick.up.timeStamp;
  }

  /**
   * button
   */
  get button() {
    return this.up.button;
  }

  get chartData() {
    return ["click", 0, this.ti, this.til];
  }
}
