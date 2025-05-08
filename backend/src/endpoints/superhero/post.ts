import { TMapEndpoints } from "..";
import { db } from "../../database";

export const mapPostSuperhero: TMapEndpoints = (router) => {

  router.post('/superhero', async (req, res) => {
    const { entity } = req.body;
    const result = await db.insertInto('superhero')
      .values(entity)
      .returningAll()
      .executeTakeFirst();
    res.status(201).json(result);
  });
  
};