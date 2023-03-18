import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import {
  Controller,
  Post,
  HttpCode,
  Body,
  UseInterceptors,
} from '@nestjs/common';

import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import { ResponseInterceptor } from '@interceptors/response.interceptor';

import { AuthService } from './auth.service';
import { UserLoginRequestDto } from './dto/user-login-request';
import { UserLoginResponseDto } from './dto/user-login-response';


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
