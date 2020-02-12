export default class DoubleClick {
  constructor(first, second) {
    this.first = first;
    this.second = second;
    this.type = "double";
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
  get ti() {
    if (this.first === null || this.second === null) {
      return 0;
    }
    return this.second.down.timeStamp - this.first.up.timeStamp;
  }

  /**
   * button
   */
  get button() {
    return this.second.button;
  }

  get chartData() {
    return ["dbClick", this.first.ti, this.second.ti, this.ti];
  }
}
