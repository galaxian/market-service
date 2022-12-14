import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateProductRequestDto } from './dto/create-product-request.dto';
import { productDetailResponseDto } from './dto/product-detail-response.dto';
import { ProductResponseDto } from './dto/product.dto';
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

  async findAllProduct(): Promise<ProductResponseDto[]> {
    const allProduct = await this.productRepository.find();
    const response: ProductResponseDto[] = [];

    allProduct.forEach((product) => {
      response.push(product.toResponseDto());
    });

    return response;
  }

  async findProduct(id: number): Promise<productDetailResponseDto> {
    const findProduct = await this.productRepository.findOne({ where: { id } });

    if (!findProduct) {
      throw new NotFoundException('상품이 존재하지 않습니다.');
    }

    return findProduct.toDetailResponseDto();
  }

  async updateProduct(
    id: number,
    requestDto: CreateProductRequestDto,
  ): Promise<productDetailResponseDto> {
    const findProduct = await this.productRepository.findOne({ where: { id } });

    if (!findProduct) {
      throw new NotFoundException('상품이 존재하지 않습니다.');
    }

    findProduct.deliveryDate = requestDto.deliveryDate;
    findProduct.deliveryFee = requestDto.deliveryFee;
    findProduct.images = requestDto.images;
    findProduct.isSoldOut = requestDto.isSoldOut;
    findProduct.mainImage = requestDto.mainImage;
    findProduct.origin = requestDto.origin;
    findProduct.price = requestDto.price;
    findProduct.productName = requestDto.productName;
    findProduct.sale = requestDto.sale;

    const result = await this.productRepository.save(findProduct);

    return result.toDetailResponseDto();
  }

  async deleteProduct(id: number): Promise<{ id: number }> {
    const findProduct = await this.productRepository.findOne({ where: { id } });

    if (!findProduct) {
      throw new NotFoundException('상품이 존재하지 않습니다.');
    }

    const deleteId = { id: findProduct.id };

    await this.productRepository.delete(id);

    return deleteId;
  }

  async findProductByfield(
    options: FindOneOptions<Product>,
  ): Promise<Product | undefined> {
    return await this.productRepository.findOne(options);
  }
}
