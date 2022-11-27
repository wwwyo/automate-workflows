import * as dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

export default class Datetime {
  private readonly dayjs: dayjs.Dayjs;

  constructor(dt: Date) {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.tz.setDefault('Asia/Tokyo');
    this.dayjs = dayjs(dt);
  }

  get value() {
    return this.format('YYYY-MM-DD hh:mm:ss');
  }

  format(fmt) {
    return this.dayjs.format(fmt);
  }
}
