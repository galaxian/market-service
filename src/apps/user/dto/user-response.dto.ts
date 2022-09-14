import { IsNotEmpty } from 'class-validator';

export class UserResponseDto {
  id: number;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  authority: string;
}
