import * as bcrypt from 'bcrypt';
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';

import { User } from './user.entity';
import { UserListDto } from './dto/user-list-response.dto';
import { UserWithThisIdNotFound } from './exception/users.exceptions';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
  ) {}

  async findAll(start: number, size: number) {
    const users = await this.usersRepository.findAll({
      offset: start,
      limit: size,
      attributes: {
        exclude: ['password', 'email'],
      },
    });
    const usersCount = await this.usersRepository.count();

    return new UserListDto(users, usersCount);
  }

  async getUserById(id: string): Promise<UserResponseDto> {
    const user = await this.usersRepository.findByPk<User>(id, {
      attributes: { exclude: ['email', 'password'] },
    });
    if (!user) {
      throw new UserWithThisIdNotFound();
    }
    return new UserResponseDto(user);
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne<User>({ where: { email } });
  }

  async create(user: CreateUserDto): Promise<User> {
    const hash = await bcrypt.hash(user.password, 10);
    const userData = await this.usersRepository.create({
      email: user.email,
      password: hash,
      nickname: user.nickname,
      birthday: user.birthday,
      gender: user.gender
    });
    return userData;
  }
}
