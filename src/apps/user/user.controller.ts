import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Version,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Role } from './decorator/role.decorator';
import { UserReqeustDto } from './dto/user-request.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { Authority } from './entity/user.authority';
import { AuthGuard } from './security/auth.guard';
import { RoleGuard } from './security/role.guard';
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
  @ApiBearerAuth('access-token')
  @Get('/authentipicate')
  @Version('1')
  @UseGuards(AuthGuard)
  isAuthenticated(@Req() req: Request): any {
    const user: any = req.user;
    return user;
  }

  @ApiOperation({
    summary: '관리자 권한 부여 api',
    description: '관리자가 새로운 관리자에게 권한을 부여할 수 있는 api',
  })
  @ApiBearerAuth('access-token')
  @Put('/:id')
  @Version('2')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard, RoleGuard)
  @Role(Authority.ADMIN)
  updateAuthorityAdmin(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ authority: Authority }> {
    return this.userService.updateAuthorityAdmin(id);
  }
}
