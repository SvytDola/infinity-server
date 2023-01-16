import { ApiProperty } from '@nestjs/swagger';

import { UserDto } from '../../users/dto/user.dto';
import { User } from '../../../modules/users/user.entity';

export class UserLoginResponseDto extends UserDto {
  @ApiProperty()
  token: string;

  constructor(user: User, token?: string) {
    super(user);
    this.token = token;
  }
}
