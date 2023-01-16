import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';

import { AppModule } from './../src/app.module';
import { CreateUserDto } from '../src/modules/users/dto/create-user.dto';
import { UserLoginRequestDto } from '../src/modules/auth/dto/user-login-request';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/auth', () => {
    describe('POST /login', () => {
      it('Should return 200 and jwt token', () => {
        const validLoginBody: UserLoginRequestDto = {
          email: 'example@gmail.com',
          password: 'h8hzz9z8',
        };

        return request(app.getHttpServer())
          .post('/auth/login')
          .send(validLoginBody)
          .expect(HttpStatus.OK)
          .expect((res) => {
            const token = res.body.token;
            console.log(token);
            expect(token).not.toBe(undefined);
          });
      });
    });

    describe('POST /register', () => {
      it('Should return 200 and jwt token', () => {
        const validRegisterBody: CreateUserDto = {
          email: 'nice@gmail.com',
          password: '123456',
          nickname: 'alert',
        };
        return request(app.getHttpServer())
          .post('/auth/register')
          .send(validRegisterBody)
          .expect(HttpStatus.CREATED)
          .expect((res) => {
            const token = res.body.token;
            console.log(token);
            expect(token).not.toBe(undefined);
          });
      });
    });
  });
});
