import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProductRequestDto {
  @ApiProperty({
    type: String,
    example: '아스파라거스',
    description: '상품 이름',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  productName: string;

  @ApiProperty({
    type: Number,
    example: 15000,
    description: '상품 가격',
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    type: Number,
    example: 1000,
    description: '배송비',
  })
  @IsNumber()
  deliveryFee: number;

  @ApiProperty({
    type: String,
    example: 'Korea',
    description: '원산지',
  })
  @IsString()
  @MaxLength(20)
  origin: string;

  @ApiProperty({
    type: Number,
    example: 1000,
    description: '할인 금액',
  })
  @IsNumber()
  sale: number;

  @ApiProperty({
    type: String,
    example: 'https://...com',
    description: '메인 이미지 url',
  })
  @IsNotEmpty()
  @IsString()
  mainImage: string;

  @ApiProperty({
    type: String,
    example: 'https://...com',
    description: '상품 정보 이미지 url',
  })
  @IsNotEmpty()
  @IsString()
  images: string;

  @ApiProperty({
    type: Boolean,
    example: false,
    description: '매진 유무',
  })
  @IsBoolean()
  isSoldOut: boolean;

  @ApiProperty({
    type: Number,
    example: 3,
    description: '배송 예정일',
  })
  @IsNumber()
  deliveryDate: number;
}
