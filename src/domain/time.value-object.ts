export default class Time {
  readonly seconds: number;

  constructor(seconds: number) {
    this.seconds = seconds;
  }

  get hhmm() {
    let hh = 0;
    let mm = 0;
    let remain = this.seconds;

    if (remain / 3600 >= 1) {
      hh = Math.floor(remain / 3600);
      remain %= 3600;
    }
    if (remain / 60 >= 1) {
      mm = Math.floor(remain / 60);
      remain %= 60;
    }

    return `${hh}時間${mm}分`;
  }
}
