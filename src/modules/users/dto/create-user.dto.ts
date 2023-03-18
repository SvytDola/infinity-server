import {
  IsString,
  IsEmail,
  MaxLength,
  IsStrongPassword,
  IsEnum,
  IsISO8601,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { i18nValidationMessage } from 'nestjs-i18n';

import { Gender } from '@shared/enum/gender';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail({}, { message: i18nValidationMessage('validation.IsEmail') })
  readonly email: string;

  @ApiProperty()
  @IsStrongPassword(
    {},
    { message: i18nValidationMessage('validation.IsStrongPassword') },
  )
  readonly password: string;

  @ApiProperty()
  @IsString({ message: i18nValidationMessage('validation.IsString') })
  @MaxLength(20, { message: i18nValidationMessage('validation.MaxLength') })
  readonly nickname: string;

  @ApiProperty()
  @IsEnum(Gender, { message: 'validation.IsGender' })
  readonly gender: Gender;

  @ApiProperty()
  @IsISO8601({}, { message: 'validation.IsBirthday' })
  readonly birthday: string;
}
