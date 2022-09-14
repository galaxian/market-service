import { IsNotEmpty } from 'class-validator';

export class CreateProductRequestDto {
  @IsNotEmpty()
  productName: string;

  @IsNotEmpty()
  price: number;

  deliveryFee: number;

  origin: string;

  sale: number;

  @IsNotEmpty()
  mainImage: string;

  @IsNotEmpty()
  images: string;

  isSoldOut: boolean;

  deliveryDate: number;
}
