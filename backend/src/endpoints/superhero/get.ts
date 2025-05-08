import { TMapEndpoints } from "..";
import { db } from "../../database";

export const mapGetSuperhero: TMapEndpoints = (router) => {

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

}