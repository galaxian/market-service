import { Order } from 'src/apps/order/entity/order.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { productDetailResponseDto } from '../dto/product-detail-response.dto';
import { ProductResponseDto } from '../dto/product.dto';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 75 })
  productName: string;

  @Column({ type: 'int', default: 1000 })
  deliveryFee: number;

  @Column({ type: 'boolean', default: false })
  isSoldOut: boolean;

  @Column({ type: 'varchar' })
  mainImage: string;

  @Column({ type: 'varchar' })
  images: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int', default: 0 })
  sale: number;

  @Column({ type: 'varchar', length: 25, default: 'Korea' })
  origin: string;

  @Column({ type: 'int', default: 3 })
  deliveryDate: number;

  @OneToMany(() => Order, (order) => order.product, { eager: false })
  orders: Order[];

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
