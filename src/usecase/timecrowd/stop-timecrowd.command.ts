import HandleTimeCrowdRequest from 'src/presentation/timecrowd/handle-timecrowd.request.dto';

export default class StopTimeCrowdCommand {
  readonly event: 'entry_start' | 'entry_stop';
  readonly taskName: string;
  readonly startedAt: string;
  readonly stoppedAt: string;
  readonly durationSeconds: number;

  constructor(request: HandleTimeCrowdRequest) {
    this.event = request.event;
    this.taskName = request.task.title;
    this.startedAt = request.started_at;
    this.stoppedAt = request.stopped_at;
    this.durationSeconds = request.duration;
  }
}
