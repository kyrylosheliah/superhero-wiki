import { TMapEndpoints } from "..";
import { db } from "../../database";

export const mapGetManySuperhero: TMapEndpoints = (router) => {

  router.get('/superhero/all', async (req, res) => {
    const superheroes = await db.selectFrom('superhero')
      .selectAll()
      .execute();
    res.json(superheroes);
  });

};