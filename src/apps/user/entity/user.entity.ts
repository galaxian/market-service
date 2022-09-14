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
import { UserResponseDto } from '../dto/user-response.dto';
import { Authority } from './user.authority';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 30 })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  username: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'enum', enum: Authority, default: Authority.USER })
  authority: Authority;

  @OneToMany(() => Order, (order) => order.user, { eager: false })
  orders: Order[];

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  toResponseDto(): UserResponseDto {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
      authority: this.authority,
    };
  }
}
