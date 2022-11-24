import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SlackModule } from './slack/slack.module';
import { NotionService } from './notion/notion.service';
import { ConfigModule } from '@nestjs/config';
import { TimecrowdModule } from './timecrowd/timecrowd.module';

@Module({
  imports: [SlackModule, ConfigModule.forRoot({ envFilePath: ['.env'] }), TimecrowdModule],
  controllers: [AppController],
  providers: [AppService, NotionService],
})
export class AppModule {}
