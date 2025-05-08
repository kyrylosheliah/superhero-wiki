import express from 'express';
import { mapSuperheroEndpoints } from './superhero';

export type TMapEndpoints = (router: express.Router) => void;

export const mapAllEndpoints: TMapEndpoints = (router) => {

  mapSuperheroEndpoints(router);

};
