export { default as useCache } from './composables/useCache';

export enum CacheTagPrefix {
  Product = 'P',
  Category = 'C',
  Attribute = 'A',
  Cart = 'B',
  Filter = 'F',
  Block = 'O',
  View = 'V'
}

export interface CacheTag {
  prefix: CacheTagPrefix;
  value: string;
}
