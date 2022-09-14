import { IsNotEmpty } from 'class-validator';
import { productDetailResponseDto } from 'src/apps/product/dto/product-detail-response.dto';
import { UserResponseDto } from 'src/apps/user/dto/user-response.dto';
import { OrderStatus } from '../entity/order.status';

export class OrderDetailResponseDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  totalPrice: number;

  @IsNotEmpty()
  orderStatus: OrderStatus;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  user: UserResponseDto;

  @IsNotEmpty()
  product: productDetailResponseDto;

  @IsNotEmpty()
  createAt: Date;
}
