import { db, NewSuperhero, Superhero, SuperheroUpdate } from '.';

export async function findSuperheroById(id: number) {
  return await db.selectFrom('superhero')
    .where('id', '=', id)
    .selectAll()
    .executeTakeFirst();
}

export async function findSuperhero(criteria: Partial<Superhero>) {
  let query = db.selectFrom('superhero');

  if (criteria.id) {
    query = query.where('id', '=', criteria.id);
  }

  return await query.selectAll().execute();
}

export async function updateSuperhero(id: number, updateWith: SuperheroUpdate) {
  await db.updateTable('superhero')
    .set(updateWith)
    .where('id', '=', id)
    .execute();
}

export async function createSuperhero(superhero: NewSuperhero) {
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
