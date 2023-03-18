import { ApiProperty } from '@nestjs/swagger';
import { BaseApiResponse } from '@shared/base.response';

import { UserDto } from './user.dto';
import { User } from '../user.entity';

export class UserResponseDto extends BaseApiResponse {
  @ApiProperty({
    type: UserDto,
  })
  readonly user: UserDto;


  constructor(user: User) {
    super();
    this.user = new UserDto(user);
  }
}
