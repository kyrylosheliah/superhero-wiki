import { TMapEndpoints } from "..";
import { db, Superhero } from "../../database";

export const mapPutSuperhero: TMapEndpoints = (router) => {

  router.put(
    '/superhero/:id',
    async (req: any, res: any) => {
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
    },
  );

}