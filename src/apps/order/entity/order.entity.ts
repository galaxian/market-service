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
import { OrderStatus } from './order.status';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  quantity: number;

  @Column()
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
}
