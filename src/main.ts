import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomExceptionFilter } from './custom-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new CustomExceptionFilter());
  await app.listen(Number(process.env.PORT) || '3000', '0.0.0.0');
}
bootstrap();
