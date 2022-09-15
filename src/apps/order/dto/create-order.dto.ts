import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { OrderStatus } from '../entity/order.status';

export class CreateOrderRequestDto {
  @ApiProperty({
    type: Number,
    example: 2,
    description: '구매 수량',
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

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
    description: '상품 pk',
  })
  @IsNotEmpty()
  @IsNumber()
  productId: number;
}
