import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ProductResponseDto {
  @ApiProperty({
    type: Number,
    example: 1,
    description: '상품 pk',
  })
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    type: String,
    example: '아스파라거스',
    description: '상품 이름',
  })
  @IsNotEmpty()
  productName: string;

  @ApiProperty({
    type: Boolean,
    example: false,
    description: '매진 유무',
  })
  @IsNotEmpty()
  isSoldOut: boolean;

  @ApiProperty({
    type: String,
    example: 'https://...com',
    description: '메인 이미지 url',
  })
  @IsNotEmpty()
  mainImage: string;

  @ApiProperty({
    type: Number,
    example: 15000,
    description: '상품 가격',
  })
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    type: Number,
    example: 1000,
    description: '할인 금액',
  })
  @IsNotEmpty()
  sale: number;
}
