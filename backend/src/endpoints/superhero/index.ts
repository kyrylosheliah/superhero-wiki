import { TMapEndpoints } from "..";
import { mapDeleteSuperhero } from "./delete";
import { mapGetSuperhero } from "./get";
import { mapGetManySuperhero } from "./getMany";
import { mapPostSuperhero } from "./post";
import { mapPutSuperhero } from "./put";

export const mapSuperheroEndpoints: TMapEndpoints = (router) => {
  mapPostSuperhero(router);
  mapGetManySuperhero(router);
  mapGetSuperhero(router);
  mapPutSuperhero(router);
  mapDeleteSuperhero(router);
};
