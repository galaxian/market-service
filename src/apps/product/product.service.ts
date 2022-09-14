import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductRequestDto } from './dto/create-product-request.dto';
import { productDetailResponseDto } from './dto/product-detail-response.dto';
import { Product } from './entity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createProduct(
    requestDto: CreateProductRequestDto,
  ): Promise<productDetailResponseDto> {
    const createProduct = this.productRepository.create({
      ...requestDto,
    });

    const response: Product = await this.productRepository.save(createProduct);

    return response.toDetailResponseDto();
  }
}
