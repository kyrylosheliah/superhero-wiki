import { stringFromStringArray, stringArrayFromString } from "@/utils/arrayEditionInterception";

export type Superhero = {
  id: number;
  nickname: string;
  real_name: string | null;
  origin_description: string | null;
  superpowers: string[];
  catch_prase: string | null;
};

export type SuperheroAggregate = {
  superhero: Superhero;
  cover?: string;
  images: Array<string>;
};

export type EditableSuperhero = Superhero & {
  superpowers: string;
};

export const editableFromSuperhero = (obj: Superhero) => {
  let newObj: any = { ...obj };
  newObj.superpowers = stringFromStringArray(newObj.superpowers);
  return newObj as EditableSuperhero;
};

export const superheroFromEditable = (obj: EditableSuperhero) => {
  let newObj: any = { ...obj };
  newObj.superpowers = stringArrayFromString(newObj.superpowers);
  return newObj as Superhero;
};

export const emptySuperhero = (): Superhero => ({
  id: 0,
  nickname: "",
  real_name: null,
  origin_description: null,
  superpowers: [],
  catch_prase: null,
});

export interface SuperheroSearch {
  pageNo: number;
  pageSize: number;
  ascending?: boolean;
  orderBy?: keyof Superhero | undefined;
  text?: string;
}

export const emptySuperheroSearch = (): SuperheroSearch => ({
  pageNo: 1,
  pageSize: 5,
  ascending: true,
  orderBy: undefined,
  text: undefined,
});
