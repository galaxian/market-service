import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { UserReqeustDto } from './dto/user-request.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './security/payload.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUpUser(userRequestDto: UserReqeustDto): Promise<UserResponseDto> {
    const findUser: User = await this.findUserByfield({
      where: { email: userRequestDto.email },
    });

    const { email, username, password } = userRequestDto;

    if (findUser) {
      throw new BadRequestException('email 또는 아이디가 이미 존재합니다.');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user: User = this.userRepository.create({
      email,
      username,
      password: hashedPassword,
    });

    const saveUser: User = await this.userRepository.save(user);

    return saveUser.toResponseDto();
  }

  async findUserByfield(
    options: FindOneOptions<User>,
  ): Promise<User | undefined> {
    return await this.userRepository.findOne(options);
  }

  async validateUser(
    userRequestDto: UserReqeustDto,
  ): Promise<{ accessToken: string } | undefined> {
    const findUser: User = await this.findUserByfield({
      where: { username: userRequestDto.username },
    });

    const validPassword = await bcrypt.compare(
      userRequestDto.password,
      findUser.password,
    );

    if (!findUser || !validPassword) {
      throw new UnauthorizedException();
    }

    const payload: Payload = { id: findUser.id, authority: findUser.authority };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async tokenValidateUser(payload: Payload): Promise<User> {
    return await this.findUserByfield({
      where: { id: payload.id },
    });
  }
}
