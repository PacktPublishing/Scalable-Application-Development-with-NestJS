import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { otel } from 'tracing';

async function bootstrap() {
  const otelStd = otel('main');
  await otelStd.start();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
