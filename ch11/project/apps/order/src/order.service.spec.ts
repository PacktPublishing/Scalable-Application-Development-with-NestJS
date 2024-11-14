import { ClientProxy } from '@nestjs/microservices';
import { OrderService } from './order.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrderInput } from './dto/create-order.dto';
import { OrderStatus } from '@app/shared';
import { EVENTS } from '@app/constants';

describe('OrderService', () => {
  let orderService: OrderService;
  let inventoryClient: ClientProxy;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: 'INVENTORY_SERVICE',
          useValue: { emit: jest.fn() }, // Mocking ClientProxy's emit function
        },
      ],
    }).compile();
    orderService = module.get<OrderService>(OrderService);
    inventoryClient = module.get<ClientProxy>('INVENTORY_SERVICE');
  });
  it('should create an order and emit an event to the inventory service', () => {
    const createOrderInput: CreateOrderInput = {
      name: 'John Doe',
      price: 1000,
      product: 'Laptop',
      quantity: 2,
    };

    // Call the createOrder method
    const result = orderService.createOrder(createOrderInput);

    // Assertions
    expect(result).toEqual({
      ...createOrderInput,
      id: '1',
      status: OrderStatus.PENDING,
    });

    // Ensure the order was added to the orders array
    expect(orderService['orders'].length).toBe(1);

    // Verify that the emit function was called with the correct event and payload
    expect(inventoryClient.emit).toHaveBeenCalledWith(EVENTS.ORDER_CREATED, {
      ...createOrderInput,
      id: '1',
      status: OrderStatus.PENDING,
    });
  });
});
