import { compare } from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { UniqueConstraintError } from 'sequelize';

import { User } from '@modules/users/user.entity';

import { UsersService } from '@modules/users/users.service';
import { CreateUserDto } from '@modules/users/dto/create-user.dto';


import { UserLoginRequestDto } from './dto/user-login-request';
import { UserLoginResponseDto } from './dto/user-login-response';
import {
  InvalidPasswordOrEmail,
  UserWithThisEmailAlreadyExists,
} from './exception/auth.exceptions';

@Injectable()
export class AuthService {
  private JWT_KEY: string;

  constructor(
    private usersService: UsersService,
    private jwt: JwtService,
    private configService: ConfigService,
  ) {
    this.JWT_KEY = this.configService.get<string>('jwtKey');
  }

  // Token generation.
  private async sign(user: User): Promise<string> {
    return await this.jwt.signAsync(
      { email: user.email, timestamp: Date.now() },
      { secret: this.JWT_KEY },
    );
  }

  public async login(body: UserLoginRequestDto): Promise<UserLoginResponseDto> {
    const email = body.email;
    const password = body.password;

    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new InvalidPasswordOrEmail();
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new InvalidPasswordOrEmail();
    }

    const token = await this.sign(user);
    return new UserLoginResponseDto(user, token);
  }

  public async register(body: CreateUserDto): Promise<UserLoginResponseDto> {
    try {
      const user = await this.usersService.create(body);
      const token = await this.sign(user);
      return new UserLoginResponseDto(user, token);
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        throw new UserWithThisEmailAlreadyExists();
      }
    }
  }

  verifyJwt(payload: string): { email: string } {
    const jwt = this.jwt.verify(payload, { secret: this.JWT_KEY });
    return { email: jwt.email };
  }
}
