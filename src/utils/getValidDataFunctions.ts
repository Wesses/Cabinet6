export function getDataForWaterTab<T>(
  data: T[],
  enumObject: object,
  filterFn: (item: T) => boolean,
  dateKeys?: (keyof T)[]
) {
  const enumKeys = Object.keys(enumObject) as (keyof T)[];

  return data.filter(filterFn).map((item, index) => {
    return {
      rows: enumKeys.map((key) => {
        const value = item[key];
        if (dateKeys?.includes(key) && typeof value === "string") {
          return new Date(value).toLocaleDateString("ru-RU");
        }
        return value;
      }),
      index,
    };
  });
}
