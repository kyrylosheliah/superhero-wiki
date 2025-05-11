import { stringFromStringArray, stringArrayFromString } from "@/utils/arrayEditionInterception";

export type TSuperhero = {
  id: number;
  nickname: string;
  real_name: string | null;
  origin_description: string | null;
  superpowers: string[];
  catch_prase: string | null;
};

export type TSuperheroAggregate = {
  superhero: TSuperhero;
  cover?: string;
  images: Array<string>;
};

export type TEditableSuperhero = TSuperhero & {
  superpowers: string;
};

export const editableFromSuperhero = (obj: TSuperhero) => {
  let newObj: any = { ...obj };
  newObj.superpowers = stringFromStringArray(newObj.superpowers);
  return newObj as TEditableSuperhero;
};

export const superheroFromEditable = (obj: TEditableSuperhero) => {
  let newObj: any = { ...obj };
  newObj.superpowers = stringArrayFromString(newObj.superpowers);
  return newObj as TSuperhero;
};

export const emptySuperhero = (): TSuperhero => ({
  id: 0,
  nickname: "",
  real_name: null,
  origin_description: null,
  superpowers: [],
  catch_prase: null,
});

export type TSuperheroSearch = {
  pageNo: number;
  pageSize: number;
  ascending?: boolean;
  orderBy?: keyof TSuperhero | undefined;
  text?: string;
}

export const emptySuperheroSearch = (): TSuperheroSearch => ({
  pageNo: 1,
  pageSize: 5,
  ascending: true,
  orderBy: undefined,
  text: undefined,
});
