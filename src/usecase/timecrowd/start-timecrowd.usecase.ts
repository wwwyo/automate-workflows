import { Injectable } from '@nestjs/common';
import Datetime from 'src/domain/datetime.value-object';
import Channel from 'src/domain/slack/channel.value-object';
import Event from 'src/domain/timecrowd/event.value-object';
import SlackClient from 'src/infrastructure/module/slack.client';
import StartTimeCrowdCommand from './start-timecrowd.command';

@Injectable()
export default class StartTimeCrowdUseCase {
  constructor(private readonly messageClient: SlackClient) {}

  async handle(command: StartTimeCrowdCommand): Promise<void> {
    if (new Event(command.event).isStop) return;
    const startedAt = new Datetime(new Date(command.startedAt));
    const message = `タスクが開始しました。\n${
      command.taskName
    } \n${startedAt.format('HH:mm')} 〜`;

    try {
      await this.messageClient.postMessage(new Channel('分報_渡部'), message);
    } catch (e) {
      console.dir(e);
      this.messageClient.postMessage(
        new Channel('ERROR'),
        'タスクの開始に失敗しました。',
      );
    }
  }
}
