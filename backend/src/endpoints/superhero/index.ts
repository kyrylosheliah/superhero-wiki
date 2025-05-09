import { TMapEndpoints } from "..";
import { db } from "../../database";
import { mapSuperheroImageEndpoints } from "./image";

export const mapSuperheroEndpoints: TMapEndpoints = (router) => {

  mapSuperheroImageEndpoints(router);

  router.delete('/superhero/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const result = await db.deleteFrom('superhero')
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirst();
    if (result) {
      res.json({ deleted: result });
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  });

  router.get('/superhero/:id', async (req: any, res: any) => {
    const id = parseInt(req.params.id, 10);
    const superhero = await db.selectFrom('superhero')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();
    if (superhero) {
      res.json(superhero);
    } else {
      return res.status(404).json({ error: 'Not found' });
    }
  });

  router.get('/superhero/all', async (req, res) => {
    const superheroes = await db.selectFrom('superhero')
      .selectAll()
      .execute();
    res.json(superheroes);
  });

  router.post('/superhero', async (req, res) => {
    const { entity } = req.body;
    const result = await db.insertInto('superhero')
      .values(entity)
      .returningAll()
      .executeTakeFirst();
    res.status(201).json(result);
  });

  router.put('/superhero/:id', async (req: any, res: any) => {
    const id = parseInt(req.id, 10);
    const result = await db.updateTable('superhero')
      .set(req)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirst();
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  });

};
