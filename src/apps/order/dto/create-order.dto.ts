import { IsNotEmpty } from 'class-validator';
import { OrderStatus } from '../entity/order.status';

export class CreateOrderRequestDto {
  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  orderStatus: OrderStatus;

  @IsNotEmpty()
  productId: number;
}
