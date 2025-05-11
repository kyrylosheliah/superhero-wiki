import { sql } from 'kysely';
import { db, getSuperheroKeys, SuperheroTable, TSuperheroCreate, TSuperheroSelect, TSuperheroUpdate } from '.';

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

export interface SuperheroSearchRequest {
  pageNo: number;
  pageSize: number;
  ascending?: boolean;
  orderBy?: string;
  text?: string;
}

export async function pageFilterSuperheroes(searchRequest: SuperheroSearchRequest) {
  const { pageNo, pageSize, ascending, orderBy, text } = searchRequest;
  const keys = getSuperheroKeys();
  const orderingKey: keyof SuperheroTable =
    orderBy && keys.includes(orderBy as keyof SuperheroTable)
      ? orderBy as keyof SuperheroTable
      : "id";
  let filteringQuery = db.selectFrom('superhero');
  if (text) {
    //keys.map((key) => {
    //  filteringQuery = filteringQuery.where(key, 'like', `%${text}%`);
    //});
    filteringQuery = filteringQuery
      .where((eb) => eb.or([
        eb('nickname', 'like', `%${text}%`),
        eb('catch_prase', 'like', `%${text}%`),
        eb('real_name', 'like', `%${text}%`),
        eb('origin_description', 'like', `%${text}%`),
        sql<boolean>`EXISTS (
          SELECT 1 FROM unnest(${eb.ref('superpowers')}) AS value
          WHERE value ILIKE ${`%${text}%`}
        )`,
      ]));
  }
  const found = await filteringQuery
    .selectAll()
    .orderBy(orderingKey, ascending ? 'asc' : 'desc')
    .limit(pageSize)
    .offset((pageNo - 1) * pageSize)
    .execute();
  const searchCountResult = await filteringQuery
    .clearSelect()
    .select(db.fn.countAll().as('count'))
    .executeTakeFirst()
  const searchCount = parseInt(searchCountResult?.count as string ?? '0', 10);
  const pageModulo = searchCount % pageSize;
  const pageCount = (searchCount - pageModulo) / pageSize + (pageModulo === 0 ? 0 : 1);
  return {
    found,
    pageCount
  };
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
