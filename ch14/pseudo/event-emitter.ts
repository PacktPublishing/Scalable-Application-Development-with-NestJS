import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class InventoryService {
  constructor(private eventEmitter: EventEmitter2) {}

  updateStock(productId: number, quantity: number) {
    // Update stock logic
    this.eventEmitter.emit("stock.updated", { productId, quantity });
  }
}
