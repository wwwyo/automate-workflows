const EVENT_VALUE = {
  START_EVENT: 'start',
  STOP_EVENT: 'stop',
} as const;
type EventType = typeof EVENT_VALUE[keyof typeof EVENT_VALUE];

export default class Event {
  readonly value: EventType;

  constructor(value: string) {
    if (!(value === 'entry_start' || value === 'entry_stop'))
      throw new Error('不正なevent');
    this.value =
      value === 'entry_start'
        ? EVENT_VALUE.START_EVENT
        : EVENT_VALUE.STOP_EVENT;
  }

  get isStart() {
    return this.value === EVENT_VALUE.START_EVENT;
  }

  get isStop() {
    return this.value === EVENT_VALUE.STOP_EVENT;
  }
}
