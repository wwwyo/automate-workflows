import { Injectable } from '@nestjs/common';

@Injectable()
export class StartTimeCrowdUseCase {
  constructor(
    private readonly duplicateTaskChecker: DuplicateTaskChecker,
    private readonly newTaskCreator: NewTaskCreator,
    private readonly taskRepository: ITaskRepository,
  ) {}

  async handle(createTaskCommand: CreateTaskCommand): Promise<void> {
    const task = await this.newTaskCreator.handle(
      new TaskName(createTaskCommand.name),
    );

    const doesTaskExist = await this.duplicateTaskChecker.handle(task);
    if (doesTaskExist) throw new Exception('Same task already exists.');

    await this.taskRepository.save(task);
  }
}
