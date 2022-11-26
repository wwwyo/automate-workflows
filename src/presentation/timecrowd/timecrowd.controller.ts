import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import StartTimeCrowdCommand from 'src/usecase/timecrowd/start-timecrowd.command';
import StopTimeCrowdCommand from 'src/usecase/timecrowd/stop-timecrowd.command';
import StopTimeCrowdUseCase from 'src/usecase/timecrowd/stop-timecrowd.usecase';
import StartTimeCrowdUseCase from '../../usecase/timecrowd/start-timecrowd.usecase';
import HandleTimeCrowdRequestDto from './handle-timecrowd.request.dto';

@Controller('timecrowd')
export default class TimeCrowdController {
  constructor(
    private readonly startTimeCrowdUseCase: StartTimeCrowdUseCase,
    private readonly stopTimeCrowdUseCase: StopTimeCrowdUseCase,
  ) {}

  @Post('start')
  @HttpCode(201)
  start(
    @Body()
    request: HandleTimeCrowdRequestDto,
  ): void {
    this.startTimeCrowdUseCase.handle(new StartTimeCrowdCommand(request));
  }

  @Post('stop')
  @HttpCode(201)
  stop(
    @Body()
    request: HandleTimeCrowdRequestDto,
  ): void {
    this.stopTimeCrowdUseCase.handle(new StopTimeCrowdCommand(request));
  }
}
