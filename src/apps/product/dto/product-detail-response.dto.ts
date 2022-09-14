import { IsNotEmpty } from 'class-validator';

export class productDetailResponseDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  productName: string;

  @IsNotEmpty()
  deliveryFee: number;

  @IsNotEmpty()
  isSoldOut: boolean;

  @IsNotEmpty()
  mainImage: string;

  @IsNotEmpty()
  images: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  sale: number;

  @IsNotEmpty()
  origin: string;

  @IsNotEmpty()
  deliveryDate: number;
}
