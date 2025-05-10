export const stringFromStringArray = (input: Array<string>) =>
  input.join(", ");

export const stringArrayFromString = (input: string) =>
  input.split(",").map((e) => e.trim());