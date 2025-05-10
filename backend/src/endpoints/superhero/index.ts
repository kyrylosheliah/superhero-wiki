import { TMapEndpoints } from "..";
import { db, TSuperheroCreate, TSuperheroUpdate } from "../../database";
import { createSuperhero, deleteSuperhero, findSuperheroById, updateSuperhero } from "../../database/SuperheroRepository";
import { mapSuperheroImageEndpoints } from "./image";

export const mapSuperheroEndpoints: TMapEndpoints = (app) => {

  mapSuperheroImageEndpoints(app);

  app.get('/superhero/all', async (req: any, res: any) => {
    const superheroes = await db.selectFrom('superhero')
      .selectAll()
      .execute();
    res.json(superheroes);
  });

  app.delete('/superhero/:id', async (
    req: { params: { id: string } },
    res: any,
  ) => {
   const id = parseInt(req.params.id, 10);
   const result = await deleteSuperhero(id);
   if (result) {
     res.json({ deleted: result });
   } else {
     res.status(404).json({ error: 'Not found' });
   }
  });

  app.get('/superhero/:id', async (
    req: { params: { id: string } },
    res: any,
  ) => {
   const id = parseInt(req.params.id, 10);
   const superhero = await findSuperheroById(id);
   if (superhero) {
     res.json(superhero);
   } else {
     return res.status(404).json({ error: 'Not found' });
   }
  });

  app.post('/superhero', async (
    req: { entity: TSuperheroCreate },
    res: any,
  ) => {
    const result = await createSuperhero(req.entity);
    res.status(201).json(result);
  });

  app.put('/superhero/:id', async (
    req: {
      params: { id: string },
      entity: TSuperheroUpdate,
    },
    res: any,
  ) => {
    const id = parseInt(req.params.id, 10);
    const result = await updateSuperhero(id, req.entity);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  });

};
