import { Module } from '@nestjs/common';
import SlackClient from 'src/infrastructure/module/slack.client';
import StartTimeCrowdUseCase from 'src/usecase/timecrowd/start-timecrowd.usecase';
import TimeCrowdController from 'src/presentation/timecrowd/timecrowd.controller';
import StopTimeCrowdUseCase from 'src/usecase/timecrowd/stop-timecrowd.usecase';

@Module({
  providers: [SlackClient, StartTimeCrowdUseCase, StopTimeCrowdUseCase],
  controllers: [TimeCrowdController],
})
export class TimecrowdModule {}
