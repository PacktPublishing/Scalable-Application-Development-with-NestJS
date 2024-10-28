import { Order, OrderProcessPayload, OrderStatus } from '@app/shared';
import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.dto';
import { ClientProxy } from '@nestjs/microservices';
import { EVENTS } from '@app/constants';

@Injectable()
export class OrderService {
  constructor(
    @Inject('INVENTORY_SERVICE') private inventoryClient: ClientProxy,
  ) {}
  // in memory storage - for demo purposes
  private orders: Order[] = [];

  getHello(): string {
    return 'Hello World! -- Order Service';
  }

  createOrder(createOrderInput: CreateOrderInput): Order {
    const order = {
      ...createOrderInput,
      id: `${this.orders.length + 1}`,
      status: OrderStatus.PENDING,
    };
    this.orders.push(order);
    console.log('Order created:', order, this.orders);
    // emit event to the inventory service
    this.inventoryClient.emit(EVENTS.ORDER_CREATED, order);
    return order;
  }

  handleOrderProcessed(data: OrderProcessPayload) {
    const order = this.orders.find((o) => o.id === data.orderId);
    if (order) {
      order.status = data.success
        ? OrderStatus.COMPLETED
        : OrderStatus.CANCELLED;
      console.log('Order status updated:', order, this.orders);
    } else {
      console.log('Order not found');
    }
  }
}
