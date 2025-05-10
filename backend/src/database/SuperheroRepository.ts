import { db, TSuperheroCreate, TSuperheroSelect, TSuperheroUpdate } from '.';

export async function findSuperheroById(id: number) {
  return await db.selectFrom('superhero')
    .where('id', '=', id)
    .selectAll()
    .executeTakeFirst();
}

export async function findSuperhero(criteria: Partial<TSuperheroSelect>) {
  let query = db.selectFrom('superhero');

  if (criteria.id) {
    query = query.where('id', '=', criteria.id);
  }

  return await query.selectAll().execute();
}

export async function updateSuperhero(id: number, updateWith: TSuperheroUpdate) {
  return await db.updateTable('superhero')
    .set(updateWith)
    .where('id', '=', id)
    .execute();
}

export async function createSuperhero(superhero: TSuperheroCreate) {
  return await db.insertInto('superhero')
    .values(superhero)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function deleteSuperhero(id: number) {
  return await db.deleteFrom('superhero')
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
}
