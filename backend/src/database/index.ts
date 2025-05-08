import { Generated, Insertable, PostgresDialect, Selectable, Updateable } from "kysely";
import { Kysely } from "kysely";
import { Pool } from 'pg';

import * as dotenv from 'dotenv';
dotenv.config();

export interface Database {
  superhero: SuperheroTable,
}

export interface SuperheroTable {
  id: Generated<number>;
  nickname: string;
  real_name: string | null;
  origin_description: string | null;
  superpowers: string[];
  catch_prase: string | null;
}

export type Superhero = Selectable<SuperheroTable>;
export type NewSuperhero = Insertable<SuperheroTable>;
export type SuperheroUpdate = Updateable<SuperheroTable>;

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
});

export const db = new Kysely<Database>({
  dialect,
});

// TODO: migrator
