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
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserReqeustDto } from './dto/user-request.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { AuthGuard } from './security/auth.guard';
import { UserService } from './user.service';

@Controller({ path: '/users', version: ['1', '2'] })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  signUpUser(@Body() userRequestDto: UserReqeustDto): Promise<UserResponseDto> {
    return this.userService.signUpUser(userRequestDto);
  }

  @Post('/signin')
  @UsePipes(ValidationPipe)
  async signInUser(
    @Body() userReqeustDto: UserReqeustDto,
    @Res() res: Response,
  ): Promise<any> {
    const jwt = await this.userService.validateUser(userReqeustDto);
    res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);
    return res.json(jwt);
  }

  @Get('/authentipicate')
  @UseGuards(AuthGuard)
  isAuthenticated(@Req() req: Request): any {
    const user: any = req.user;
    return user;
  }
}
