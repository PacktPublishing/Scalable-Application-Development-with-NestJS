import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CommonModule } from 'src/common/common.module';
import { PaginationService } from 'src/common/pagination/pagination.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CommonModule],
  controllers: [ProductsController],
  providers: [ProductsService, PaginationService],
})
export class ProductsModule {}
