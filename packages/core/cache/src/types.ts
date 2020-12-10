export enum CacheTagPrefix {
  Product = 'P',
  Category = 'C',
  Attribute = 'A',
  Cart = 'B',
  Filter = 'F',
  Block = 'O'
}

export interface CacheTag {
  prefix: CacheTagPrefix;
  value: string;
}
