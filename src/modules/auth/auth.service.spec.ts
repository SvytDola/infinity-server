import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from './auth.service';

import { UsersModule } from '@modules/users/users.module';

import configuration from '@config/configuration';
import { DatabaseModule } from '@database/database.module';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule,
        DatabaseModule,
        UsersModule,
        ConfigModule.forRoot({ load: [configuration] }),
      ],
      providers: [AuthService],
    }).compile();

    service = module.get(AuthService);
  });

  it('Should be defined.', () => {
    expect(service).toBeDefined();
  });

  it('Should return token.', async () => {
    const response = await service.login({
      email: 'example@gmail.com',
      password: '123456',
    });

    console.log(response);
  });
});
