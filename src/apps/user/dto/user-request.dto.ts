import { IsNotEmpty } from 'class-validator';

export class UserReqeustDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  username: string;
}
