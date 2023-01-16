import { ApiProperty } from '@nestjs/swagger';

import { User } from '../user.entity';
import { Gender } from '../../../shared/enum/gender';

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly nickname: string;

  @ApiProperty()
  readonly gender: Gender;

  @ApiProperty()
  readonly birthday: string;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.nickname = user.nickname;
    this.birthday = user.birthday;
    this.gender = user.gender;
  }
}
