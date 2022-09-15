import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserReqeustDto {
  @ApiProperty({
    type: String,
    example: 'abcd1234@gmail.com',
    description: '사용자 이메일',
  })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    type: String,
    example: 'abcd1234!@#$',
    description: '비밀번호',
  })
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({
    type: String,
    example: '아무개',
    description: '사용자 아이디',
  })
  @IsNotEmpty()
  readonly username: string;
}
