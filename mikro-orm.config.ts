import path from 'node:path';

import { Migrator } from '@mikro-orm/migrations';
import { defineConfig } from '@mikro-orm/postgresql';
import { SeedManager } from '@mikro-orm/seeder';
import { config } from 'dotenv';

import { Address } from '@features/address/entities';
import { User } from '@features/user/entities';

config();

export default defineConfig({
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  password: process.env.DB_PASSWORD,
  entities: [Address, User],
  migrations: {
    path: path.join(process.cwd(), 'src', 'database', 'migrations'),
  },
  seeder: {
    path: path.join(process.cwd(), 'src', 'database', 'seeders'),
  },
  discovery: {
    warnWhenNoEntities: false,
    disableDynamicFileAccess: true,
  },
  extensions: [Migrator, SeedManager],
});
