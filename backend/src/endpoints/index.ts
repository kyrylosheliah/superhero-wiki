import express from 'express';
import { mapSuperheroEndpoints } from './Superhero';

export type TMapEndpoints = (app: express.Application) => express.Application;

export const mapAllEndpoints: TMapEndpoints = (app) => {

  mapSuperheroEndpoints(app);

  return app;
};
