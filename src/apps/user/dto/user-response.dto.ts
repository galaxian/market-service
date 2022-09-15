import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Authority } from '../entity/user.authority';

export class UserResponseDto {
  @ApiProperty({ type: Number, example: 1, description: '사용자 pk' })
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    type: String,
    example: 'abcd1234@gmail.com',
    description: '사용자 이메일',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    example: '아무개',
    description: '사용자 아이디',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    type: Authority,
    example: 'USER',
    description: '사용자 권한',
  })
  @IsNotEmpty()
  authority: Authority;
}
