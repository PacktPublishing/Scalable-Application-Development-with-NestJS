import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class EventsService {
  constructor(private eventEmitter: EventEmitter2) {}

  triggerEvent(): void {
    this.eventEmitter.emit("user.created", {
      /* payload */
    });
  }
}
