import { HttpStatus } from '@nestjs/common';
import { ApiException } from '@exception/base.exception';

export class UserWithThisIdNotFound extends ApiException {
  constructor() {
    super('error.USER_WITH_THIS_ID_NOT_FOUND', HttpStatus.NOT_FOUND);
  }
}

