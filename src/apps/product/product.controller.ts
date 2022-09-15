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
  Version,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '../user/decorator/role.decorator';
import { Authority } from '../user/entity/user.authority';
import { AuthGuard } from '../user/security/auth.guard';
import { RoleGuard } from '../user/security/role.guard';
import { CreateProductRequestDto } from './dto/create-product-request.dto';
import { productDetailResponseDto } from './dto/product-detail-response.dto';
import { ProductResponseDto } from './dto/product.dto';
import { ProductService } from './product.service';

@ApiTags('상품 관련 api')
@Controller({ path: '/products', version: ['1', '2'] })
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({
    summary: '상품 등록 api',
    description: '관리자가 상품 정보를 받아 DB에 등록하는 api',
  })
  @Post('/')
  @Version('2')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard, RoleGuard)
  @Role(Authority.ADMIN)
  createProduct(
    @Body() requestDto: CreateProductRequestDto,
  ): Promise<productDetailResponseDto> {
    return this.productService.createProduct(requestDto);
  }

  @ApiOperation({
    summary: '상품 전체 조회 api',
    description: 'DB에 등록된 모든 상품들을 전체 조회하는 api',
  })
  @Get()
  @Version('1')
  findAllProduct(): Promise<ProductResponseDto[]> {
    return this.productService.findAllProduct();
  }

  @ApiOperation({
    summary: '상품 상세 조회 api',
    description: '상품 pk를 사용하여 상품을 상세히 조회하는 api',
  })
  @Get('/:id')
  @Version('1')
  @UsePipes(ValidationPipe)
  findProduct(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<productDetailResponseDto> {
    return this.productService.findProduct(id);
  }

  @ApiOperation({
    summary: '상품 정보 수정 api',
    description: '관리자가 상품 정보를 받아 수정하는 api',
  })
  @Put('/:id')
  @Version('2')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard, RoleGuard)
  @Role(Authority.ADMIN)
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() requestDto: CreateProductRequestDto,
  ): Promise<productDetailResponseDto> {
    return this.productService.updateProduct(id, requestDto);
  }

  @ApiOperation({
    summary: '상품 정보 삭제 api',
    description: '관리자가 상품을 DB에서 삭제하는 api',
  })
  @Delete('/:id')
  @Version('2')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard, RoleGuard)
  @Role(Authority.ADMIN)
  deleteProduct(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ id: number }> {
    return this.productService.deleteProduct(id);
  }
}
