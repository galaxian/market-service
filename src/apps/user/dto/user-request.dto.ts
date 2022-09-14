import { IsNotEmpty } from 'class-validator';
import { User } from '../entity/user.entity';

export class UserReqeustDto {
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly username: string;
}
