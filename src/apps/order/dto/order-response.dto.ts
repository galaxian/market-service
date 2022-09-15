import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { productDetailResponseDto } from 'src/apps/product/dto/product-detail-response.dto';
import { UserResponseDto } from 'src/apps/user/dto/user-response.dto';
import { OrderStatus } from '../entity/order.status';

export class OrderDetailResponseDto {
  @ApiProperty({
    type: Number,
    example: 11,
    description: '주문 pk',
  })
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    type: Number,
    example: 12500,
    description: '총 구매 금액',
  })
  @IsNotEmpty()
  totalPrice: number;

  @ApiProperty({
    type: String,
    example: OrderStatus.READY,
    description: '배송 상태',
  })
  @IsNotEmpty()
  orderStatus: OrderStatus;

  @ApiProperty({
    type: Number,
    example: 1,
    description: '구매 개수',
  })
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    type: UserResponseDto,
    description: '구매자 정보',
  })
  @IsNotEmpty()
  user: UserResponseDto;

  @ApiProperty({
    type: productDetailResponseDto,
    description: '구매 상품 상세 정보',
  })
  @IsNotEmpty()
  product: productDetailResponseDto;

  @ApiProperty({
    type: Date,
    description: '주문 날짜',
  })
  @IsNotEmpty()
  createAt: Date;
}
