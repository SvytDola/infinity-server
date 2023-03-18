import { ApiProperty } from '@nestjs/swagger';

export class BaseApiResponse {
  @ApiProperty()
  readonly message: string;

  @ApiProperty()
  readonly statusCode: number;
}
