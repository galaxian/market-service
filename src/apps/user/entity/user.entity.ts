import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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

  static from(email: string, password: string, username: string) {
    const user = new User();
    user.email = email;
    user.password = password;
    user.username = username;
    return user;
  }
}
