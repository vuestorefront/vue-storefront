export interface Predicate <T> {
  (param: T): boolean;
}

export interface Callable {
  (...xs: any): any;
}

export interface Localized {
  locale: string;
}

export type FilterCriteriaRecord <T extends Record<string, any>> = {
  [K in keyof T]?: T[K] | Predicate<T[K]>;
}

export type FilterCriteriaRecordValue <T extends Record<string, any>> =
  FilterCriteriaRecord<T>[keyof T]

export type FilterCriteriaRecordField <T extends Record<string, any>> = [
  keyof T, FilterCriteriaRecordValue<T>
];

export function isCallableCriteriaRecordValue <T>(value: FilterCriteriaRecordValue<T>): value is Predicate<T[keyof T]> {
  return typeof value === 'function';
}

export function filterByCriteriaRecordField <T>(target: T) {
  return function ([key, value]: FilterCriteriaRecordField<T>): boolean {
    return isCallableCriteriaRecordValue<T>(value)
      ? value(target?.[key])
      : target?.[key] === value;
  };
}

export function filterByCriteriaRecord <T>(criteria: FilterCriteriaRecord<T>) {
  return function (target: T): boolean {
    return Object.entries<FilterCriteriaRecordValue<T>>(criteria)
      .every(
        filterByCriteriaRecordField<T>(target) as Callable
      );
  };
}

export function filterArrayByCriteriaRecord <T>(array: T[], criteria?: FilterCriteriaRecord<T>): T[] {
  return criteria
    ? array?.filter(filterByCriteriaRecord<T>(criteria))
    : array;
}
