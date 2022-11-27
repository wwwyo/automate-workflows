import * as dayjs from 'dayjs';

export default class Datetime {
  private readonly dayjs: dayjs.Dayjs;

  constructor(dt: Date) {
    this.dayjs = dayjs(dt);
  }

  get value() {
    return this.format('YYYY-MM-DD HH:mm:ss');
  }

  format(fmt) {
    return this.dayjs.format(fmt);
  }
}
