import { TMapEndpoints } from "..";
import { db, TSuperheroCreate, TSuperheroUpdate } from "../../database";
import { createSuperhero, deleteSuperhero, findSuperheroById, pageFilterSuperheroes, SuperheroSearchRequest, updateSuperhero } from "../../database/SuperheroRepository";
import { mapSuperheroImageEndpoints } from "./image";
import { Request, Response } from "express";

export const mapSuperheroEndpoints: TMapEndpoints = (app) => {

  mapSuperheroImageEndpoints(app);

  app.get('/superhero/all', async (req: Request, res: Response) => {
    const superheroes = await db.selectFrom('superhero')
      .selectAll()
      .execute();
    res.json(superheroes);
  });

  app.post('/superhero/search', async (req: Request, res: Response) => {
    const searchRequest: SuperheroSearchRequest = req.body;
    // TODO: validate schema
    const entities = pageFilterSuperheroes(searchRequest);
    console.log(entities);
        //IQueryable<T> entities = dbSet.AsQueryable();
        //var (pageCount, result) = await entities.ToPagedFilteredListAsync(
        //    new T(),
        //    request,
        //    cancellationToken
        //);
        //if (pageCount == 0) {
        //    return TypedResults.NotFound();
        //}
        //if (spec.DoAfterGetMultiple is not null) {
        //    foreach (var entity in result) {
        //        spec.DoAfterGetMultiple(entity);
        //    }
        //}
        //return TypedResults.Ok(new GetMultipleResponse(pageCount, result));
    res.status(200);
  });

  app.delete('/superhero', async (req: Request, res: Response) => {
    const { id } = req.body;
    //const id = parseInt(req.id, 10);
    const result = await deleteSuperhero(id);
    if (result) {
      res.json({ deleted: result });
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  });

  app.get('/superhero/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const superhero = await findSuperheroById(id);
    if (superhero) {
      res.json(superhero);
    } else {
      return res.status(404).json({ error: "Not found" });
    }
  });

  app.post('/superhero', async (req: Request, res: Response) => {
    let { entity }: { entity: TSuperheroCreate } = req.body;
    if (entity.nickname === "") {
      // 422 unprocessable entity
      res.status(422).json({ error: "Nickname is empty"});
      return;
    }
    entity.id = undefined;
    const result = await createSuperhero(entity);
    res.status(201).json(result);
  });

  app.put('/superhero', async (req: Request, res: Response) => {
    const { id, entity }: { id: number, entity: TSuperheroUpdate } = req.body;
    //const id = parseInt(req.id, 10);
    const result = await updateSuperhero(id, entity);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  });

};
