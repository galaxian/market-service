import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { productDetailResponseDto } from '../dto/product-detail-response.dto';
import { ProductResponseDto } from '../dto/product.dto';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  productName: string;

  @Column({ default: 1000 })
  deliveryFee: number;

  @Column({ default: false })
  isSoldOut: boolean;

  @Column()
  mainImage: string;

  @Column()
  images: string;

  @Column()
  price: number;

  @Column({ default: 0 })
  sale: number;

  @Column({ default: 'Korea' })
  origin: string;

  @Column({ default: 3 })
  deliveryDate: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  toDetailResponseDto(): productDetailResponseDto {
    return {
      id: this.id,
      productName: this.productName,
      price: this.price,
      deliveryFee: this.deliveryFee,
      deliveryDate: this.deliveryDate,
      origin: this.origin,
      images: this.images,
      mainImage: this.mainImage,
      isSoldOut: this.isSoldOut,
      sale: this.sale,
    };
  }

  toResponseDto(): ProductResponseDto {
    return {
      id: this.id,
      productName: this.productName,
      isSoldOut: this.isSoldOut,
      mainImage: this.mainImage,
      price: this.price,
      sale: this.sale,
    };
  }
}
