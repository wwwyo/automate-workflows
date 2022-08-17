import { Injectable } from '@nestjs/common';
import {
  Block,
  ChatPostMessageResponse,
  KnownBlock,
  WebClient,
} from '@slack/web-api';

@Injectable()
export class SlackService {
  private readonly client: WebClient;
  private readonly errorChannel: string;
  constructor() {
    const token = process.env.SLACK_ACCESS_TOKEN;
    this.client = new WebClient(token);
    this.errorChannel = process.env.ERROR_SLACK_CHANNEL;
  }

  verify(token: string) {
    if (token !== process.env.SLACK_VERIFY_TOKEN) {
      console.error('未承認のアクセス');
      throw new Error(`failed token verify: ${token}`);
    }
  }

  postTask(channel: string, thread_ts?: string) {
    return this.postMessage(channel, this.interactiveTaskUi, thread_ts);
  }

  getCreatedTaskMessage(url: string, taskDetails: string, userIds?: string[]) {
    const mentions = userIds?.map((id) => `<@${id}>`);
    return `taskを作成したよ！${
      mentions?.join('') || ''
    }\n${url}\n${taskDetails}`;
  }

  postMessage(
    channel = this.errorChannel,
    text: string | (Block | KnownBlock)[],
    thread_ts?: string,
  ): Promise<ChatPostMessageResponse> {
    return this.client.chat.postMessage({
      channel: channel,
      text: typeof text === 'string' && text,
      blocks: typeof text !== 'string' ? text : undefined,
      thread_ts: thread_ts ?? undefined,
    });
  }

  isInputAction(actionId) {
    return actionId !== 'actionId-0';
  }

  get interactiveTaskUi() {
    return [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'タスクをNotionに登録するよ！',
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'input',
        element: {
          type: 'plain_text_input',
          action_id: 'plain_text_input-action',
        },
        label: {
          type: 'plain_text',
          text: '＊タイトル',
          emoji: true,
        },
      },
      // 担当者はnotion無料プランでは使えない
      {
        type: 'input',
        element: {
          type: 'multi_users_select',
          placeholder: {
            type: 'plain_text',
            text: 'Select users',
            emoji: true,
          },
          action_id: 'multi_users_select-action',
        },
        label: {
          type: 'plain_text',
          text: '担当者',
          emoji: true,
        },
      },
      {
        type: 'input',
        element: {
          type: 'datepicker',
          placeholder: {
            type: 'plain_text',
            text: '開始日を選択',
            emoji: true,
          },
          action_id: 'datepicker-action',
        },
        label: {
          type: 'plain_text',
          text: '開始日',
          emoji: true,
        },
      },
      {
        type: 'input',
        element: {
          type: 'datepicker',
          placeholder: {
            type: 'plain_text',
            text: '終了日を選択',
            emoji: true,
          },
          action_id: 'datepicker-action',
        },
        label: {
          type: 'plain_text',
          text: '終了日',
          emoji: true,
        },
      },
      {
        type: 'input',
        element: {
          type: 'plain_text_input',
          multiline: true,
          action_id: 'plain_text_input-action',
          placeholder: {
            type: 'plain_text',
            text: '目的、なぜやるか等',
          },
        },
        label: {
          type: 'plain_text',
          text: '詳細',
          emoji: true,
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            style: 'danger',
            text: {
              type: 'plain_text',
              text: '作成する',
              emoji: true,
            },
            value: 'add-task',
            action_id: 'actionId-0',
          },
        ],
      },
    ];
  }
}
