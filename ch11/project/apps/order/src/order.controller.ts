import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order, OrderProcessPayload } from '@app/shared';
import { CreateOrderInput } from './dto/create-order.dto';
import { EVENTS } from '@app/constants';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getHello(): string {
    return this.orderService.getHello();
  }

  @Post('create-order')
  createOrder(@Body() createOrderInput: CreateOrderInput): Order {
    return this.orderService.createOrder(createOrderInput);
  }

  @EventPattern(EVENTS.ORDER_PROCESSED)
  async handleOrderProcessed(data: OrderProcessPayload) {
    this.orderService.handleOrderProcessed(data);
  }
}
