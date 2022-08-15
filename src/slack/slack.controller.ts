import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { NotionService } from 'src/notion/notion.service';
import { Task } from 'src/notion/task.model';
import { CHANNELS } from './slack.consts';
import { SlackService } from './slack.service';

@Controller('slack')
export class SlackController {
  constructor(
    private readonly slackService: SlackService,
    private readonly notionService: NotionService,
  ) {}

  @Get('users')
  user() {
    this.notionService.getAllUser();
    return;
  }

  @Post('event')
  @HttpCode(200)
  event(
    @Body()
    request: {
      token: string;
      event: { channel: string; thread_ts: string };
    },
  ): string {
    const { channel, thread_ts } = request.event;
    try {
      this.slackService.verify(request.token);
      this.slackService.postTask(channel, thread_ts);
      return 'success';
    } catch (e) {
      this.slackService.postMessage(
        channel,
        `slack event error: ${e}`,
        thread_ts,
      );
      return 'failed';
    }
  }

  @Post('task')
  @HttpCode(200)
  async task(@Body('payload') payload: any) {
    const res = JSON.parse(payload);
    const channel = res.channel?.id;
    const thread_ts = res.message.ts;
    try {
      this.slackService.verify(res.token);
      const values = Object.values(res.state.values);
      const valArray = values.map((valWrapper) => {
        return Object.values(valWrapper)[0];
      });
      const task = new Task(
        valArray[0]['value'],
        valArray[1]['selected_users'],
        valArray[2]['selected_date'],
        valArray[3]['selected_date'],
        valArray[4]['value'],
        CHANNELS[channel],
      );
      if (!task.title) throw new Error('タイトルを入力してください');
      const url = await this.notionService.createTask(task);
      this.slackService.postMessage(
        channel,
        this.slackService.getCreatedTaskMessage(url, task.responsibilities),
        thread_ts,
      );
      return 'success';
    } catch (e) {
      this.slackService.postMessage(
        channel,
        `slack event error: ${e}`,
        thread_ts,
      );
      return 'failed';
    }
  }
}
