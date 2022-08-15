import { Module } from '@nestjs/common';
import { NotionService } from 'src/notion/notion.service';
import { SlackController } from './slack.controller';
import { SlackService } from './slack.service';

@Module({
  providers: [SlackService, NotionService],
  controllers: [SlackController],
  exports: [SlackService],
})
export class SlackModule {}
