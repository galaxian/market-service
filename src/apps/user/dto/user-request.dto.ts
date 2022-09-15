import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

export class UserReqeustDto {
  @ApiProperty({
    type: String,
    example: 'abcd1234@gmail.com',
    description: '사용자 이메일',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(
    '/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i',
  )
  readonly email: string;

  @ApiProperty({
    type: String,
    example: 'abcd1234!@#$',
    description: '비밀번호',
  })
  @IsNotEmpty()
  @IsString()
  @Matches('/^.*(?=^.{10,15}$)(?=.*d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/')
  readonly password: string;

  @ApiProperty({
    type: String,
    example: '아무개',
    description: '사용자 아이디',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  readonly username: string;
}
