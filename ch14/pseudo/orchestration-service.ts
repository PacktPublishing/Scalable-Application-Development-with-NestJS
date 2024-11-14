import { Injectable } from "@nestjs/common";
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from "@nestjs/microservices";

@Injectable()
export class OrderOrchestratorService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: "127.0.0.1",
        port: 3003,
      },
    });
  }

  async createOrder(orderData: any) {
    try {
      const order = await this.client
        .send({ cmd: "create_order" }, orderData)
        .toPromise();
      await this.client.send({ cmd: "reserve_stock" }, order).toPromise();
      await this.client.send({ cmd: "create_invoice" }, order).toPromise();
    } catch (error) {
      // Compensating transactions
      await this.client.send({ cmd: "cancel_order" }, orderData).toPromise();
    }
  }
}
