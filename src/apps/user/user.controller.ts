import {
  Body,
  Controller,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { rmSync } from 'fs';
import { UserReqeustDto } from './dto/user-request.dto';
import { UserResponseDto } from './dto/user-response.dto';
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
}
