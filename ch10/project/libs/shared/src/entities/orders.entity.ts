import { OrderStatus } from '../types/order-status';

export class Order {
  id: string;
  name: string;
  product: string;
  quantity: number;
  price: number;
  status: OrderStatus;
}
