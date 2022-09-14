import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { UserReqeustDto } from './dto/user-request.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
    options: FindOneOptions<UserReqeustDto>,
  ): Promise<User | undefined> {
    return await this.userRepository.findOne(options);
  }
}
