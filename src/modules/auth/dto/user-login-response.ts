import { ApiProperty } from '@nestjs/swagger';

import { User } from '@modules/users/user.entity';
import { UserDto } from '@modules/users/dto/user.dto';

export class UserLoginResponseDto extends UserDto {
  @ApiProperty()
  token: string;

  constructor(user: User, token?: string) {
    super(user);
    this.token = token;
  }
}
