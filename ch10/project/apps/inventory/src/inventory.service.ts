import { EVENTS } from '@app/constants';
import { Inventory, Order, OrderProcessPayload } from '@app/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class InventoryService {
  constructor(@Inject('ORDER_SERVICE') private orderClient: ClientProxy) {}

  // in memory storage of inventory - for demo purposes
  private inventory: Inventory[] = [
    { id: 1, name: 'Laptop', quantity: 100 },
    { id: 2, name: 'Mouse', quantity: 50 },
    { id: 3, name: 'Keyboard', quantity: 75 },
  ];

  getHello(): string {
    return 'Hello World! -- Inventory Service';
  }

  handleOrderCreated(order: Order) {
    let success = false;
    let message = '';
    const item = this.inventory.find((i) => i.name === order.product);

    if (item) {
      if (item.quantity < order.quantity) {
        message = 'Insufficient quantity in inventory';
      } else {
        item.quantity -= order.quantity;
        success = true;
        message = 'Order processed successfully';
      }
    } else {
      message = `Product ${order.product} not found in inventory`;
    }

    const payload: OrderProcessPayload = {
      success,
      message,
      orderId: order.id,
    };
    console.log('Order processed with the payload:', payload);
    // emit event to the order service
    return this.orderClient.emit(EVENTS.ORDER_PROCESSED, payload);
  }
}
