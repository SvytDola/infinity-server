import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { usersProviders } from './users.providers';
import { UsersService } from './users.service';

import { DatabaseModule } from '../../database/database.module';

import configuration from '../../config/configuration';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        ConfigModule.forRoot({ load: [configuration] }),
      ],
      providers: [UsersService, ...usersProviders],
    }).compile();

    service = module.get(UsersService);
  });

  it('Should be defined.', () => {
    expect(service).toBeDefined();
  });

  it('Should return user.', async () => {
    const user = await service.getUserByEmail('example@gmail.com');
    expect(user).not.toBe(undefined);
  });
});
