import { mapSuperheroEndpoints } from './superhero';

export type TMapEndpoints = (app: any) => void;

export const mapAllEndpoints: TMapEndpoints = (app) => {

  mapSuperheroEndpoints(app);

};
