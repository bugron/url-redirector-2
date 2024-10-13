export const getEnumValues = <T>(enumObj: { [key: string]: T }): T[] => {
  return Object.values(enumObj) as T[]
}
