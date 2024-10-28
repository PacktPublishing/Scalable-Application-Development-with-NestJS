import { Controller, Get } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { EventPattern } from '@nestjs/microservices';
import { Order } from '@app/shared';
import { EVENTS } from '@app/constants';

@Controller()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  getHello(): string {
    return this.inventoryService.getHello();
  }

  @EventPattern(EVENTS.ORDER_CREATED)
  async handleOrderCreated(data: Order) {
    this.inventoryService.handleOrderCreated(data);
  }
}
