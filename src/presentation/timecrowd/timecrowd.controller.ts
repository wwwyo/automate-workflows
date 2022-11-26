import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import StartTimeCrowdInput from 'src/usecase/timecrowd/start-timecrowd.command';
import StartTimeCrowdUseCase from '../../usecase/timecrowd/start-timecrowd.usecase';
import StartTimeCrowdRequestDto from './handle-timecrowd.request.dto';

@Controller('timecrowd')
export default class TimeCrowdController {
  constructor(private readonly startTimeCrowdUseCase: StartTimeCrowdUseCase) {}

  @Post('start')
  @HttpCode(201)
  start(
    @Body()
    request: StartTimeCrowdRequestDto,
  ): void {
    this.startTimeCrowdUseCase.handle(new StartTimeCrowdInput(request));
  }
}
