import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class productDetailResponseDto {
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
    type: Number,
    example: 1000,
    description: '배송비',
  })
  @IsNotEmpty()
  deliveryFee: number;

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
    type: String,
    example: 'https://...com',
    description: '상품 정보 이미지 url',
  })
  @IsNotEmpty()
  images: string;

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

  @ApiProperty({
    type: String,
    example: 'Korea',
    description: '원산지',
  })
  @IsNotEmpty()
  origin: string;

  @ApiProperty({
    type: Number,
    example: 3,
    description: '배송 예정일',
  })
  @IsNotEmpty()
  deliveryDate: number;
}
