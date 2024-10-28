import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { PaginationService } from 'src/common/pagination/pagination.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    private readonly paginationService: PaginationService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);

      return {
        message: 'Product created successfully',
        data: product,
      };
    } catch (error) {
      return error;
    }
  }

  async getProducts(page = 1, limit = 10) {
    const products = await this.productRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await this.productRepository.count();
    const meta = this.paginationService.getPaginationMeta(total, page, limit);

    return {
      data: products,
      meta,
    };
  }

  async getProductById(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    return {
      data: product,
    };
  }
}
