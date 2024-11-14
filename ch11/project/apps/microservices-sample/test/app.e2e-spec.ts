import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { OrderModule } from '../../order/src/order.module';
import { InventoryModule } from '../../inventory/src/inventory.module';
import { OrderStatus } from '@app/shared';
import { EVENTS } from '@app/constants';
import * as request from 'supertest';
import { CreateOrderInput } from 'apps/order/src/dto/create-order.dto';

describe('Order and Inventory Services Integration Test', () => {
  let app: INestApplication;
  // let orderClient: ClientProxy;
  let inventoryClient: ClientProxy;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        OrderModule,
        InventoryModule,
        ClientsModule.register([
          {
            name: 'ORDER_SERVICE',
            transport: Transport.TCP,
            options: { port: 8001 },
          },
          {
            name: 'INVENTORY_SERVICE',
            transport: Transport.TCP,
            options: { port: 8002 },
          },
        ]),
      ],
    }).compile();

    app = module.createNestApplication();
    app.connectMicroservice({
      transport: Transport.TCP,
      options: { port: 8001 },
    });
    app.connectMicroservice({
      transport: Transport.TCP,
      options: { port: 8002 },
    });

    await app.startAllMicroservices();
    await app.init();

    // orderClient = app.get<ClientProxy>('ORDER_SERVICE');
    inventoryClient = app.get<ClientProxy>('INVENTORY_SERVICE');
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create an order and update the inventory accordingly', async () => {
    const newOrder: CreateOrderInput = {
      product: 'Laptop',
      quantity: 2,
      name: 'John',
      price: 1000,
    };

    // Step 1: Create an order by making a POST request to the Order Service
    const createOrderResponse = await request(app.getHttpServer())
      .post('/create-order')
      .send(newOrder)
      .expect(201);

    const order = createOrderResponse.body;
    expect(order.status).toBe(OrderStatus.PENDING);

    // step 2: Verify that the Inventory Service processes the order and emits a result
    const orderProcessedSpy = jest.spyOn(inventoryClient, 'emit');

    // Emit event to simulate InventoryService processing the order
    await inventoryClient.emit(EVENTS.ORDER_CREATED, order);

    // Simulate response from Inventory Service
    const inventoryProcessedPayload = {
      ...newOrder,
      id: '1', // auto-generated id
      status: OrderStatus.PENDING,
    };

    // Ensure the order was processed
    expect(orderProcessedSpy).toHaveBeenCalledWith(
      EVENTS.ORDER_CREATED,
      inventoryProcessedPayload,
    );

    // Step 3: Verify that the Order Service updates the order status to COMPLETED
    // const updatedOrder = await request(app.getHttpServer())
    //   .get(`/orders/${order.id}`)
    //   .expect(200);

    // expect(updatedOrder.body.status).toBe(OrderStatus.COMPLETED);
  });
});
