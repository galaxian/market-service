import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Role } from '../user/decorator/role.decorator';
import { Authority } from '../user/entity/user.authority';
import { AuthGuard } from '../user/security/auth.guard';
import { RoleGuard } from '../user/security/role.guard';
import { CreateProductRequestDto } from './dto/create-product-request.dto';
import { productDetailResponseDto } from './dto/product-detail-response.dto';
import { ProductResponseDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller({ path: '/products', version: ['1', '2'] })
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard, RoleGuard)
  @Role(Authority.ADMIN)
  createProduct(
    @Body() requestDto: CreateProductRequestDto,
  ): Promise<productDetailResponseDto> {
    return this.productService.createProduct(requestDto);
  }

  @Get()
  findAllProduct(): Promise<ProductResponseDto[]> {
    return this.productService.findAllProduct();
  }

  @Get('/:id')
  @UsePipes(ValidationPipe)
  findProduct(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<productDetailResponseDto> {
    return this.productService.findProduct(id);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard, RoleGuard)
  @Role(Authority.ADMIN)
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() requestDto: CreateProductRequestDto,
  ): Promise<productDetailResponseDto> {
    return this.productService.updateProduct(id, requestDto);
  }

  @Delete('/:id')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard, RoleGuard)
  @Role(Authority.ADMIN)
  deleteProduct(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ id: number }> {
    return this.productService.deleteProduct(id);
  }
}
