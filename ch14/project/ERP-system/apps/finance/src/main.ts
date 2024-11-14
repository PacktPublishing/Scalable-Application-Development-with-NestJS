import { NestFactory } from '@nestjs/core';
import { FinanceModule } from './finance.module';

async function bootstrap() {
  const app = await NestFactory.create(FinanceModule);
  await app.listen(process.env.port ?? 3002);
}
bootstrap();
