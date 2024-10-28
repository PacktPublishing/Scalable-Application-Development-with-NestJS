import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { PaginationService } from 'src/common/pagination/pagination.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(User)
    private customerRepository: Repository<User>,

    private readonly paginationService: PaginationService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const { productId, quantity, totalPrice, customerId } = createOrderDto;

      const product = await this.productRepository.findOne({
        where: {
          id: productId,
        },
      });

      const customer = await this.customerRepository.findOne({
        where: {
          id: customerId,
        },
      });

      if (!product) {
        return {
          message: 'Product not found!',
        };
      }

      if (!customer) {
        return {
          message: 'Customer not found!',
        };
      }

      const order = this.orderRepository.create({
        product,
        quantity,
        totalPrice,
        customer,
      });

      await this.orderRepository.save(order);

      return {
        message: 'Order created successfully',
        data: order,
      };
    } catch (error) {
      return {
        message: 'An error occurred!',
        error,
        data: null,
      };
    }
  }

  async getOrders(page = 1, limit = 10) {
    const orders = await this.orderRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['product', 'customer'],
      select: {
        product: {
          name: true,
          price: true,
          image: true,
        },
        customer: {
          id: true,
          username: true,
        },
      },
    });

    const totalItems = await this.orderRepository.count();
    const meta = this.paginationService.getPaginationMeta(
      page,
      limit,
      totalItems,
    );

    return {
      data: orders,
      meta,
    };
  }

  async getOrderById(id: string) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['product', 'customer'],
      select: {
        product: {
          name: true,
          price: true,
          image: true,
        },
        customer: {
          id: true,
          username: true,
        },
      },
    });

    return {
      data: order,
    };
  }
}
