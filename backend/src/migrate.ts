import * as path from 'path';
import { promises as fs } from 'fs';
import pg from 'pg';
import { Kysely, Migrator, PostgresDialect, FileMigrationProvider } from 'kysely';

import * as dotenv from 'dotenv';
dotenv.config();

const migrationFolder = path.join(__dirname, './migrations');

async function migrateToLatest() {
  const db = new Kysely<any>({
    dialect: new PostgresDialect({
      pool: new pg.Pool({
        connectionString: process.env.DATABASE_URL,
      }),
    }),
  });

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({ fs, path, migrationFolder }),
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`migration "${it.migrationName}" was executed successfully`)
    } else if (it.status === 'Error') {
      console.error(`failed to execute migration "${it.migrationName}"`)
    }
  });

  if (error) {
    console.error('failed to migrate')
    console.error(error)
    process.exit(1)
  }

  await db.destroy();
}

migrateToLatest();