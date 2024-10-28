import { NestFactory } from '@nestjs/core';
import { InventoryModule } from './inventory.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { otel } from 'tracing';

async function bootstrap() {
  const otelStd = otel('inventory');
  await otelStd.start();
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    InventoryModule,
    {
      transport: Transport.TCP,
      options: {
        port: 8002,
        host: 'localhost',
      },
    },
  );
  await app.listen();
}
bootstrap();
