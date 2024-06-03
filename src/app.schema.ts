import {
  datetime,
  int,
  mysqlTable,
  smallint,
  varchar,
} from 'drizzle-orm/mysql-core';

export const test01 = mysqlTable('Test01', {
  id: int('id').autoincrement().primaryKey(),
  nama: varchar('name', { length: 100 }),
  status: smallint('status'),
  created: datetime('created'),
  updated: datetime('updated'),
});

export type Test01 = typeof test01.$inferSelect;
