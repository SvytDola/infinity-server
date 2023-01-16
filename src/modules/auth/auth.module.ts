import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { UsersModule } from '../../modules/users/users.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({ secret: 'superSecret' }),
    ConfigModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [ AuthService],
})
export class AuthModule {}
