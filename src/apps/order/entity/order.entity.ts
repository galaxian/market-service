import { Product } from 'src/apps/product/entity/product.entity';
import { User } from 'src/apps/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderDetailResponseDto } from '../dto/order-response.dto';
import { OrderStatus } from './order.status';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'int' })
  totalPrice: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.READY })
  orderStatus: OrderStatus;

  @ManyToOne(() => User, (user) => user.orders, { eager: false })
  user: User;

  @ManyToOne(() => Product, (product) => product.orders, { eager: false })
  product: Product;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  toDetailResponseDto(): OrderDetailResponseDto {
    return {
      id: this.id,
      quantity: this.quantity,
      orderStatus: this.orderStatus,
      totalPrice: this.totalPrice,
      createAt: this.createAt,
      user: this.user.toResponseDto(),
      product: this.product.toDetailResponseDto(),
    };
  }
}
