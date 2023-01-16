import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Dialect } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import { User } from '../modules/users/user.entity';

interface DatabaseConfig {
  host: string;
  database: string;
  port: number;
  username: string;
  password: string;
  dialect: Dialect;
}

export const databaseProviders: Provider[] = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (configSerice: ConfigService) => {
      const config = configSerice.get<DatabaseConfig>('database');
      const sequelize = new Sequelize({
        dialect: config.dialect,
        host: config.host,
        port: config.port,
        username: config.username,
        password: config.password,
        database: config.database,
      });
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    },
    inject: [ConfigService],
  },
];
