import { IsNotEmpty } from 'class-validator';

export class ProductResponseDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  productName: string;

  @IsNotEmpty()
  isSoldOut: boolean;

  @IsNotEmpty()
  mainImage: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  sale: number;
}
