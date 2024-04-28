export const isNotEmptyString = (value: string): boolean => {
  return typeof value === "string" && !!value && value !== "";
};
