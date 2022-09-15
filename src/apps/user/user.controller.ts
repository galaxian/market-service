import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Version,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { UserReqeustDto } from './dto/user-request.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { AuthGuard } from './security/auth.guard';
import { UserService } from './user.service';

@ApiTags('회원가입 및 로그인 Api')
@Controller({ path: '/users', version: ['1', '2'] })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: '회원가입 api',
    description: '이메일, 아이디, 비밀번호를 입력받아 회원가입을 진행한다.',
  })
  @Post('/signup')
  @Version('1')
  @UsePipes(ValidationPipe)
  signUpUser(@Body() userRequestDto: UserReqeustDto): Promise<UserResponseDto> {
    return this.userService.signUpUser(userRequestDto);
  }

  @ApiOperation({
    summary: '로그인 api',
    description: '아이디와 비밀번호로 본인인증 후 access token 발급',
  })
  @Post('/signin')
  @Version('1')
  @UsePipes(ValidationPipe)
  async signInUser(
    @Body() userReqeustDto: UserReqeustDto,
    @Res() res: Response,
  ): Promise<any> {
    const jwt = await this.userService.validateUser(userReqeustDto);
    res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);
    return res.json(jwt);
  }

  @ApiOperation({
    summary: '토큰 검사 api',
    description: 'access token을 테스트 하는 api',
  })
  @Get('/authentipicate')
  @Version('1')
  @UseGuards(AuthGuard)
  isAuthenticated(@Req() req: Request): any {
    const user: any = req.user;
    return user;
  }
}
