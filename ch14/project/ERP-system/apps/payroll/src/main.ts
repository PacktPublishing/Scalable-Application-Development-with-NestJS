import { NestFactory } from '@nestjs/core';
import { PayrollModule } from './payroll.module';

async function bootstrap() {
  const app = await NestFactory.create(PayrollModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
