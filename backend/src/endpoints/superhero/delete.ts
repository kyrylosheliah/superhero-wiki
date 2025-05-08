import { TMapEndpoints } from "..";
import { db } from "../../database";

export const mapDeleteSuperhero: TMapEndpoints = (router) => {

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

}