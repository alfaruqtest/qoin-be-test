import {
  datetime,
  int,
  mysqlTable,
  smallint,
  varchar,
} from 'drizzle-orm/mysql-core';

export const test01 = mysqlTable('Test01', {
  Id: int('Id').autoincrement().primaryKey(),
  Nama: varchar('Name', { length: 100 }),
  Status: smallint('Status'),
  Created: datetime('Created'),
  Updated: datetime('Updated'),
});

export type Test01 = typeof test01.$inferSelect;
