import { Injectable, OnModuleInit } from '@nestjs/common'; 
import { EventEmitter2 } from '@nestjs/event-emitter'; 
 
@Injectable() 
export class OrderService implements OnModuleInit { 
  constructor(private eventEmitter: EventEmitter2) {} 
 
  onModuleInit() { 
    this.eventEmitter.on('stock.updated', (event) => { 
      // Handle stock updated event 
      this.updateOrderStock(event.productId, event.quantity); 
    }); 
  } 
 
  updateOrderStock(productId: number, quantity: number) { 
    // Update order stock logic 
  } 
} 
