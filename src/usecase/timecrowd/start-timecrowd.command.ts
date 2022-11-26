import HandleTimeCrowdRequest from 'src/presentation/timecrowd/handle-timecrowd.request.dto';

export default class StartTimeCrowdCommand {
  readonly event: 'entry_start' | 'entry_stop';
  readonly taskName: string;
  readonly startedAt: string;

  constructor(request: HandleTimeCrowdRequest) {
    this.event = request.event;
    this.taskName = request.task.title;
    this.startedAt = request.started_at;
  }
}
