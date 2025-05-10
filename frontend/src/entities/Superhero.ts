import { stringArrayToString, stringToStringArray } from "@/utils/arrayEditionInterception";

export type Superhero = {
  id: number;
  nickname: string;
  real_name: string | null;
  origin_description: string | null;
  superpowers: string[];
  catch_prase: string | null;
};

export type EditableSuperhero = Superhero & {
  superpowers: string;
};

export const editableFromSuperhero = (obj: Superhero) => {
  let newObj: any = { ...obj };
  newObj.superpowers = stringArrayToString(newObj.superpowers);
  return newObj as EditableSuperhero;
};

export const superheroFromEditable = (obj: EditableSuperhero) => {
  let newObj: any = { ...obj };
  newObj.superpowers = stringToStringArray(newObj.superpowers);
  return newObj as Superhero;
};