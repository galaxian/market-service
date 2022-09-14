import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProductRequestDto } from './dto/create-product-request.dto';
import { productDetailResponseDto } from './dto/product-detail-response.dto';
import { ProductService } from './product.service';

@Controller({ path: '/products', version: ['1', '2'] })
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/')
  @UsePipes(ValidationPipe)
  createProduct(
    @Body() requestDto: CreateProductRequestDto,
  ): Promise<productDetailResponseDto> {
    return this.productService.createProduct(requestDto);
  }
}
