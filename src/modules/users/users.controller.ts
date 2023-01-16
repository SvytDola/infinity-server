import { ApiQuery, ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Injectable, Controller, UseGuards, Get, Query, UseInterceptors } from '@nestjs/common';

import { UsersService } from './users.service';
import { AuthGuard } from '../../guards/auth.guard';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { UserListDto } from './dto/user-list-response.dto';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';

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
}
