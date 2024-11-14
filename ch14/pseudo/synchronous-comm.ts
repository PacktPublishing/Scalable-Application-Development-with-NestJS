import { Injectable } from "@nestjs/common";
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from "@nestjs/microservices";

@Injectable()
export class BillingService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: "127.0.0.1",
        port: 3002,
      },
    });
  }

  async calculateTotal(orderId: number) {
    const order = await this.client
      .send({ cmd: "get_order" }, orderId)
      .toPromise();
    // Calculate total billing amount
  }
}
