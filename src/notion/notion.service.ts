import { Injectable } from '@nestjs/common';
import { Client } from '@notionhq/client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { Task } from './task.model';
import { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints';

// Doc: https://developers.notion.com/reference/property-value-object
@Injectable()
export class NotionService {
  private readonly notion: Client;
  private readonly databaseId: string;

  constructor() {
    this.notion = new Client({ auth: process.env.NOTION_SECRET_KEY });
    this.databaseId = process.env.NOTION_DATABASE_ID;
  }

  async getAllUser() {
    const response = await this.notion.users.list({});
    console.info(response.results);
  }

  async createTask(task: Task) {
    try {
      const requestData = {
        parent: { database_id: this.databaseId },
        properties: {
          title: {
            title: [
              {
                text: {
                  content: task.title,
                },
              },
            ],
          },
          担当者: {
            people: [], // 無料アカウントでは無理
          },
        },
      } as CreatePageParameters;

      if (task.start) {
        requestData.properties['Start'] = { date: { start: task.start } };
      }
      if (task.end) {
        requestData.properties['End'] = { date: { start: task.end } };
      }
      if (task.description) {
        requestData.children = [
          {
            heading_3: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: task.description,
                  },
                },
              ],
              color: 'default',
            },
          },
        ];
      }

      if (task.relationId) {
        requestData.properties['関連PJ'] = {
          relation: [
            {
              id: task.relationId,
            },
          ],
        };
      }

      const response = await this.notion.pages.create(requestData);
      return (response as PageObjectResponse).url;
    } catch (e) {
      console.error(e);
      throw new Error(`Missing notion createTask: ${e}`);
    }
  }
}
