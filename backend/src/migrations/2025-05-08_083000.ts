import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.createTable('superhero')
    .addColumn('id', 'serial', (cb) => cb.primaryKey())
    .addColumn('nickname', 'text', (cb) => cb.notNull())
    .addColumn('real_name', 'text')
    .addColumn('origin_description', 'text')
    .addColumn('superpowers', sql<string[]>`text[]`)
    .addColumn('catch_prase', 'text')
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('superhero').execute();
}
