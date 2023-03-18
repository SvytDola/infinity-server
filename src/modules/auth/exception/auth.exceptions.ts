import { HttpStatus } from '@nestjs/common';
import { ApiException } from '@exception/base.exception';

export class InvalidPasswordOrEmail extends ApiException {
  constructor() {
    super('error.INVALID_PASSWORD_OR_EMAIL', HttpStatus.BAD_REQUEST);
  }
}

export class UserWithThisEmailAlreadyExists extends ApiException {
  constructor() {
    super('error.USER_WITH_THIS_EMAIL_ALREADY_EXISTS', HttpStatus.CONFLICT);
  }
}