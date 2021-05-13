/* istanbul ignore file */
/**
 * @packageDocumentation The Core API Reference documentation provides detailed information for each of the functions and interfaces in the Vue Storefront.
 */

export * from './utils';
export * from './factories';
export * from './types';

declare global {
  interface Window { $vuestorefront: any }
}

if (typeof window !== 'undefined') {
  window.$vuestorefront = window.$vuestorefront || { integrations: [] };
}

export function track(id: string): void {
  if (typeof window !== 'undefined') {
    if (window.$vuestorefront) {
      window.$vuestorefront.integrations.push(id);
    }
  }
}
