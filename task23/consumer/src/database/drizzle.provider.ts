import { type FactoryProvider } from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import { MySql2Database, drizzle } from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';
import databaseConfig from './database.config';

export const DRIZZLE_PROVIDER = Symbol('DRIZZLE_PROVIDER');
export type DrizzleMaria = MySql2Database;

export const drizzleProvider: FactoryProvider = {
  provide: DRIZZLE_PROVIDER,
  inject: [databaseConfig.KEY],
  useFactory: async (config: ConfigType<typeof databaseConfig>) => {
    const conn = await mysql.createConnection({
      host: config.DB_HOST,
      user: config.DB_USER,
      database: config.DB_NAME,
      password: config.DB_PASSWORD,
    });

    return drizzle(conn);
  },
};
