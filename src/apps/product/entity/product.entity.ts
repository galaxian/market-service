import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column()
  deliveryDate: Date;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
