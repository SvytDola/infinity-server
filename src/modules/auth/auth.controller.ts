import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import {
  Controller,
  Post,
  HttpCode,
  Body,
  UseInterceptors,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserLoginRequestDto } from './dto/user-login-request';
import { UserLoginResponseDto } from './dto/user-login-response';
import { ResponseInterceptor } from '../../interceptors/response.interceptor';

@UseInterceptors(ResponseInterceptor)
@Controller('api/auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @ApiOkResponse({ type: UserLoginResponseDto })
  login(
    @Body() userLoginRequestDto: UserLoginRequestDto,
  ): Promise<UserLoginResponseDto> {
    return this.authService.login(userLoginRequestDto);
  }

  @Post('register')
  @HttpCode(201)
  @ApiOkResponse({ type: UserLoginResponseDto })
  register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserLoginResponseDto> {
    return this.authService.register(createUserDto);
  }
}
