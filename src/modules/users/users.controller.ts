import {
  ApiQuery,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import {
  Injectable,
  Controller,
  UseGuards,
  Get,
  Query,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes';

import { AuthGuard } from '@guards/auth.guard';
import { ResponseInterceptor } from '@interceptors/response.interceptor';

import { UsersService } from './users.service';
import { UserListDto } from './dto/user-list-response.dto';
import { UserResponseDto } from './dto/user-response.dto';

@ApiTags('users')
@ApiHeader({ name: 'authorization', required: true })
@UseInterceptors(ResponseInterceptor)
@UseGuards(AuthGuard)
@Injectable()
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiQuery({ name: 'start', type: 'number' })
  @ApiQuery({ name: 'size', type: 'number' })
  @ApiOkResponse({ type: UserListDto })
  @Get()
  async findAll(
    @Query('start', ParseIntPipe) start: number,
    @Query('size', ParseIntPipe) size: number,
  ) {
    return this.usersService.findAll(start, size);
  }

  @ApiOkResponse({ type: UserResponseDto })
  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }
}
