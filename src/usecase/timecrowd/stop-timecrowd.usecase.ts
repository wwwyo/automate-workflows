import { Injectable } from '@nestjs/common';
import Datetime from 'src/domain/datetime.value-object';
import Channel from 'src/domain/slack/channel.value-object';
import Time from 'src/domain/time.value-object';
import SlackClient from 'src/infrastructure/module/slack.client';
import StopTimeCrowdCommand from './stop-timecrowd.command';

@Injectable()
export default class StopTimeCrowdUseCase {
  constructor(private readonly messageClient: SlackClient) {}

  async handle(command: StopTimeCrowdCommand): Promise<void> {
    const startedAt = new Datetime(new Date(command.startedAt));
    const stoppedAt = new Datetime(new Date(command.stoppedAt));
    const duration = new Time(command.durationSeconds);
    const message = `タスクが停止しました。\n${command.taskName}： ${
      duration.hhmm
    } \n${startedAt.format('HH:mm')} 〜 ${stoppedAt.format('HH:mm')}`;

    try {
      await this.messageClient.postMessage(new Channel('分報_渡部'), message);
    } catch (e) {
      console.dir(e);
      this.messageClient.postMessage(
        new Channel('ERROR'),
        'タスクの停止に失敗しました。',
      );
    }
  }
}
