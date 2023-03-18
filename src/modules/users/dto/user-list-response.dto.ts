import { ApiProperty } from '@nestjs/swagger';
import { BaseApiResponse } from '@shared/base.response';

import { UserDto } from './user.dto';
import { User } from '../user.entity';

export class UserListDto extends BaseApiResponse {
  @ApiProperty({
    isArray: true,
    type: UserDto,
  })
  readonly usersList: UserDto[];

  @ApiProperty()
  readonly usersCount: number;

  constructor(users: User[], usersCount: number) {
    super();
    this.usersList = users.map((user) => new UserDto(user));
    this.usersCount = usersCount;
  }
}
