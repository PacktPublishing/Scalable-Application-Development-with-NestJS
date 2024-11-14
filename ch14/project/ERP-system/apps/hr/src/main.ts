import { NestFactory } from '@nestjs/core';
import { HrModule } from './hr.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(HrModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 8001,
      host: 'localhost',
    },
  });

  app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
