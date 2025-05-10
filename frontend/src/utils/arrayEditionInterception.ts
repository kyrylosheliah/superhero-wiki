export const stringArrayToString = (input: Array<string>) =>
  input.join(", ");

export const stringToStringArray = (input: string) =>
  input.split(",").map((e) => e.trim);