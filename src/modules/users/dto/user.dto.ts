import { ApiProperty } from '@nestjs/swagger';

import { Gender } from '@shared/enum/gender';

import { User } from '../user.entity';

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  readonly nickname: string;

  @ApiProperty()
  readonly gender: Gender;

  @ApiProperty()
  readonly birthday: string;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.nickname = user.nickname;
    this.birthday = user.birthday;
    this.gender = user.gender;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
