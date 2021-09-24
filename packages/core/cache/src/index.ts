/**
 * Core Vue Storefront 2 library for enabling Server Side Rendering (SSR) cache.
 *
 * @remarks
 * The `@vue-storefront/cache` library is a Nuxt.js module, that is core piece required
 * to enable Server Side Rendering (SSR) cache in Vue Storefront 2. It uses drivers
 * to integration with specific caching solutions.
 *
 * @packageDocumentation
 */

export { useCache } from './composables/useCache';

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
  prefix: CacheTagPrefix | string;
  value: string;
}

export type CacheDriver = (options: any) => {
  invoke: () => Promise<any>;
  invalidate: () => Promise<any>;
}

export type SetTagsFn = (tags: CacheTag[]) => CacheTag[];

export interface UseCache {
  addTags(tags: CacheTag[]): void;
  clearTags(): void;
  getTags(): CacheTag[];
  setTags(callback: SetTagsFn): void;
}
