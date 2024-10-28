import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { OrderModule } from './order.module';
import { otel } from 'tracing';

async function bootstrap() {
  const otelStd = otel('main');
  await otelStd.start();

  const app = await NestFactory.create(OrderModule);

  // configure the microservice to listen on port 3001 using the TCP transport layer
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 8001,
      host: 'localhost',
    },
  });

  // to connect to the microservices linked to the order module
  app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
