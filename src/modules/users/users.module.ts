import { forwardRef, Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { UsersController } from './users.controller';

import { AuthModule } from '@modules/auth/auth.module';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  providers: [UsersService, ...usersProviders],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
