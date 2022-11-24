import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { NotionService } from 'src/notion/notion.service';
import { Task } from 'src/notion/task.model';
import { CHANNELS } from './slack.consts';
import { SlackService } from './slack.service';

@Controller('timecrowd')
export class TimeCrowdController {
  constructor(private readonly startTimeCrowdUseCase: StartTimeCrowdUseCase) {}

  // @Get('users')
  // user() {
  //   this.notionService.getAllUser();
  //   return;
  // }

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
    if (this.slackService.isInputAction(res.actions[0].action_id)) return;
    const channel = res.channel?.id;
    const thread_ts = res.message.ts;
    try {
      this.slackService.verify(res.token);
      const task = new Task({
        ...Task.parse(Object.values(res.state.values)),
        relationId: CHANNELS[channel],
      });
      if (!task.title) throw new Error('タイトルを入力してください');
      const url = await this.notionService.createTask(task);
      this.slackService.postMessage(
        channel,
        this.slackService.getCreatedTaskMessage(
          url,
          task.toString,
          task.responsibilities,
        ),
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
