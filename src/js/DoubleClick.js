export default class DoubleClick {
  constructor(first, second, lastClick) {
    this.first = first;
    this.second = second;
    this.type = "double";
    this.lastClick = lastClick;
  }

  get down() {
    return this.first.down;
  }

  get up() {
    return this.second.up;
  }

  /**
   * time-diff : first and second
   */
  get tifd() {
    if (this.first === null || this.second === null) {
      return 0;
    }
    return this.second.down.timeStamp - this.first.up.timeStamp;
  }

  /**
   * time-diff : current dbClick and last click
   */
  get ti() {
    if (this.lastClick !== null) {
      return this.first.down.timeStamp - this.lastClick.up.timeStamp;
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
    return [
      this.first.ti / 1000,
      this.second.ti / 1000,
      this.tifd / 1000,
      this.ti / 1000
    ];
  }
}
