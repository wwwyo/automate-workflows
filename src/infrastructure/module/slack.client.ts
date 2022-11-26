import { Injectable } from '@nestjs/common';
import { Block, KnownBlock, WebClient } from '@slack/web-api';
import Channel from 'src/domain/slack/channel.value-object';

@Injectable()
export default class SlackClient {
  private readonly client: WebClient;

  constructor() {
    this.client = new WebClient(process.env.SLACK_ACCESS_TOKEN);
  }

  async postMessage(
    channel: Channel,
    text: string | (Block | KnownBlock)[],
    thread_ts?: string,
  ) {
    return this.client.chat.postMessage({
      channel: channel.id,
      text: typeof text === 'string' && text,
      blocks: typeof text !== 'string' ? text : undefined,
      thread_ts: thread_ts ?? undefined,
    });
  }
}
