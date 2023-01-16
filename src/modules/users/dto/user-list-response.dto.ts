import { ApiProperty } from '@nestjs/swagger';

import { UserDto } from './user.dto';
import { User } from '../user.entity';

export class UserListDto {
  @ApiProperty({
    isArray: true,
    type: UserDto,
  })
  readonly usersList: UserDto[];

  @ApiProperty()
  readonly usersCount: number;

  constructor(users: User[], usersCount: number) {
    this.usersList = users.map((user) => new UserDto(user));
    this.usersCount = usersCount;
  }
}
