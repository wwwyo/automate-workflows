type EventValue = 'start' | 'end';

export default class Event {
  readonly value: EventValue;

  constructor(value: string) {
    if (!(value === 'entry_start' || value === 'entry_stop'))
      throw new Error('不正なevent');
    this.value = value === 'entry_start' ? 'start' : 'end';
  }
}
